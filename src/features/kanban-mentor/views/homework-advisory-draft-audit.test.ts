import "../../../../test-setup/jsdom-env.mjs";

import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
  type FetchResult,
  type Operation,
} from "@apollo/client";
import { GraphQLError, print } from "graphql";

import { userIdVar, userRolesVar } from "cache";
import { errorLink } from "api";
import { UserRole } from "api/graphql/generated/graphql";

import HomeworkAdvisoryDraft from "./homework-advisory-draft";

const h = React.createElement;
const HISTORY = "История заметок";
const AUDIT_QUERY = "homeWorkAdvisoryDraftAudit";
const AUDIT_ERROR_TEXT =
  "Не удалось загрузить историю. API недоступен или вернул ошибку.";

const draft = (
  content = "Synthetic private evidence",
  revision: string | number = 2
) => ({
  currentSourceRevision: revision,
  stale: false,
  draft: {
    id: "draft-1",
    boundSourceRevision: revision,
    marker: "SOURCE_CONFIRMED",
    content,
    author: { id: "mentor-1" },
    creationDate: "2026-10-06T10:00:00",
    updateDate: "2026-10-06T10:00:00",
  },
});

const entries = () => [
  {
    event: "SAVED",
    marker: "SOURCE_CONFIRMED",
    content: "Synthetic saved snapshot text",
    boundSourceRevision: 2,
    createdAt: "2026-10-06T10:00:00",
    author: { id: "mentor-1", firstName: "Synthetic", lastName: "Mentor" },
  },
  {
    event: "REPLACED",
    marker: "NOT_VERIFIED",
    content: "Synthetic replaced snapshot text",
    boundSourceRevision: 3,
    createdAt: "2026-10-07T09:30:00",
    author: { id: "lector-1", firstName: null, lastName: null },
  },
];

type Request = {
  operation: Operation;
  reply: (result: FetchResult) => Promise<void>;
  fail: (error: Error) => Promise<void>;
};

const setup = (
  roles: UserRole[] = [UserRole.Mentor],
  userId: string | null = "mentor-1"
) => {
  userIdVar(userId);
  userRolesVar(roles);
  const requests: Request[] = [];
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      errorLink,
      new ApolloLink(
        (operation) =>
          new Observable((observer) => {
            requests.push({
              operation,
              reply: async (result) => {
                await act(async () => {
                  observer.next(result);
                  observer.complete();
                  await Promise.resolve();
                });
              },
              fail: async (error) => {
                await act(async () => {
                  observer.error(error);
                  await Promise.resolve();
                });
              },
            });
          })
      ),
    ]),
  });
  const view = render(
    h(
      ApolloProvider,
      { client },
      h(HomeworkAdvisoryDraft, { homeworkId: "hw1" })
    )
  );
  const request = async (index = 0) => {
    await waitFor(() => assert.ok(requests[index]));
    return requests[index];
  };
  const replyDraft = async (payload: unknown = draft(), index = 0) => {
    await (
      await request(index)
    ).reply({ data: { homeWorkAdvisoryDraft: payload } });
  };
  return { ...view, client, requests, request, replyDraft };
};

const region = () =>
  screen.getByRole("region", {
    name: "AI advisory draft — решение за ментором",
  });
const auditRequests = (view: ReturnType<typeof setup>) =>
  view.requests.filter(
    ({ operation }) => operation.operationName === AUDIT_QUERY
  );
const auditRequest = async (view: ReturnType<typeof setup>, index = 0) => {
  await waitFor(() => assert.ok(auditRequests(view).length > index));
  return auditRequests(view)[index];
};
const expandHistory = async () => {
  fireEvent.click(within(region()).getByRole("button", { name: HISTORY }));
  await act(async () => {
    await Promise.resolve();
  });
};

describe("private homework advisory audit trail", () => {
  afterEach(() => {
    cleanup();
    userRolesVar([]);
    userIdVar(null);
    mock.restoreAll();
  });

  for (const [label, roles, id] of [
    ["student", [UserRole.Student], "student-1"],
    ["anonymous", [], null],
  ] as const) {
    it(`does not render or query the audit trail for ${label}`, async () => {
      const view = setup([...roles], id);
      await act(async () => {});
      assert.equal(screen.queryByRole("button", { name: HISTORY }), null);
      assert.deepEqual(view.requests, []);
    });
  }

  it("loads the audit trail only on expand and renders localized entries", async () => {
    const view = setup();
    await view.replyDraft();
    assert.deepEqual(auditRequests(view), []);

    await expandHistory();
    const audit = await auditRequest(view);
    assert.deepEqual(audit.operation.variables, { homeWorkId: "hw1" });
    assert.ok(/\bcontent\b/.test(print(audit.operation.query)));
    assert.ok(within(region()).getByText("Загрузка истории…"));

    await audit.reply({ data: { homeWorkAdvisoryDraftAudit: entries() } });
    const list = within(region()).getByRole("list");
    assert.ok(
      within(list).getByText(
        /Сохранено · SOURCE_CONFIRMED · Synthetic Mentor · 06\.10\.2026 \| 10:00 · версия 2/
      )
    );
    assert.ok(
      within(list).getByText(
        /Заменено · NOT_VERIFIED · lector-1 · 07\.10\.2026 \| 09:30 · версия 3/
      )
    );
    assert.ok(
      view.requests.every(({ operation }) =>
        operation.query.definitions.every(
          (definition) =>
            definition.kind !== "OperationDefinition" ||
            definition.operation === "query"
        )
      )
    );
  });

  it("reveals an entry snapshot only while expanded", async () => {
    const view = setup();
    await view.replyDraft();
    await expandHistory();
    await (
      await auditRequest(view)
    ).reply({ data: { homeWorkAdvisoryDraftAudit: entries() } });
    const list = within(region()).getByRole("list");
    const toggle = within(list).getByRole("button", {
      name: /Сохранено · SOURCE_CONFIRMED/,
    });
    assert.equal(
      within(list).queryByText("Synthetic saved snapshot text"),
      null
    );

    fireEvent.click(toggle);
    assert.ok(within(list).getByText("Synthetic saved snapshot text"));
    assert.equal(
      within(list).queryByText("Synthetic replaced snapshot text"),
      null
    );

    const otherToggle = within(list).getByRole("button", {
      name: /Заменено · NOT_VERIFIED/,
    });
    fireEvent.click(otherToggle);
    assert.ok(within(list).getByText("Synthetic saved snapshot text"));
    assert.ok(within(list).getByText("Synthetic replaced snapshot text"));

    fireEvent.click(otherToggle);
    assert.ok(within(list).getByText("Synthetic saved snapshot text"));
    assert.equal(
      within(list).queryByText("Synthetic replaced snapshot text"),
      null
    );

    fireEvent.click(toggle);
    assert.equal(
      within(list).queryByText("Synthetic saved snapshot text"),
      null
    );
  });

  it("collapses the trail, drops its content and refetches on reopen", async () => {
    const view = setup();
    await view.replyDraft();
    await expandHistory();
    await (
      await auditRequest(view)
    ).reply({
      data: { homeWorkAdvisoryDraftAudit: entries() },
    });
    assert.ok(within(region()).getByText(/Synthetic Mentor/));

    await expandHistory();
    assert.equal(
      within(region())
        .getByRole("button", { name: HISTORY })
        .getAttribute("aria-expanded"),
      "false"
    );
    assert.equal(within(region()).queryByText(/Synthetic Mentor/), null);

    await expandHistory();
    await waitFor(() => assert.equal(auditRequests(view).length, 2));
  });

  it("renders audit transport errors safely next to the loaded draft", async () => {
    const view = setup();
    await view.replyDraft();
    await expandHistory();
    await (
      await auditRequest(view)
    ).fail(new Error("Synthetic audit transport details"));
    assert.ok(within(region()).getByText(AUDIT_ERROR_TEXT));
    assert.ok(within(region()).getByText("Synthetic private evidence"));
    assert.equal(screen.queryByText(/Synthetic audit transport details/), null);
  });

  it("renders audit denial without raw server details", async () => {
    const view = setup();
    await view.replyDraft();
    await expandHistory();
    await (
      await auditRequest(view)
    ).reply({
      errors: [
        new GraphQLError("Access Denied", {
          extensions: { errorType: "FORBIDDEN" },
        }),
      ],
    });
    assert.ok(within(region()).getByText("Нет доступа к истории этой сдачи"));
    assert.equal(screen.queryByText(/Access Denied/), null);
  });

  it("renders an explicit empty history", async () => {
    const view = setup();
    await view.replyDraft();
    await expandHistory();
    await (
      await auditRequest(view)
    ).reply({
      data: { homeWorkAdvisoryDraftAudit: [] },
    });
    assert.ok(within(region()).getByText("Записей пока нет"));
  });

  for (const payload of [null, {}, [{ event: "SAVED" }]]) {
    it(`does not render a malformed audit payload ${JSON.stringify(
      payload
    )}`, async () => {
      const view = setup();
      await view.replyDraft();
      await expandHistory();
      await (
        await auditRequest(view)
      ).reply({ data: { homeWorkAdvisoryDraftAudit: payload } });
      assert.ok(within(region()).getByText(AUDIT_ERROR_TEXT));
    });
  }

  it("renders an unknown audit event as its raw value", async () => {
    const view = setup();
    await view.replyDraft();
    await expandHistory();
    await (
      await auditRequest(view)
    ).reply({
      data: {
        homeWorkAdvisoryDraftAudit: [
          { ...entries()[0], event: "SYNTHETIC_EVENT" },
        ],
      },
    });
    assert.ok(within(region()).getByText(/SYNTHETIC_EVENT · SOURCE_CONFIRMED/));
  });

  it("does not log audit transport errors or their content through the real error link", async () => {
    const log = mock.method(console, "log", () => {});
    const warn = mock.method(console, "warn", () => {});
    const error = mock.method(console, "error", () => {});
    const view = setup();
    await view.replyDraft();
    await expandHistory();
    await (
      await auditRequest(view)
    ).fail(new Error("Synthetic audit transport details"));
    assert.ok(within(region()).getByText(AUDIT_ERROR_TEXT));
    assert.equal(
      log.mock.calls.length + warn.mock.calls.length + error.mock.calls.length,
      0
    );
  });
});
