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
import { MemoryRouter } from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import { ThemeProvider } from "@mui/material/styles";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  gql,
  InMemoryCache,
  Observable,
  type FetchResult,
  type Operation,
} from "@apollo/client";
import { GraphQLError } from "graphql";

import { userIdVar, userRolesVar } from "cache";
import { errorLink } from "api";
import { StudentHomeWorkStatus, UserRole } from "api/graphql/generated/graphql";
import SharedHomeworkDetailsFull from "features/kanban/views/homework-details-full/homework-details-full";
import StudentHomeworkDetailsFull from "features/kanban-student/views/homework-details-full/homework-details-full";
import { createCustomTheme, initialSettings } from "theme";

import HomeworkDetails from "./homework-details/homework-details";
import MentorHomeworkDetailsFull from "./homework-details-full/homework-details-full";

const h = React.createElement;
const title = "AI advisory draft — решение за ментором";
const theme = createCustomTheme(initialSettings);
const query = gql`
  query homeWorkAdvisoryDraft($homeWorkId: ID!) {
    homeWorkAdvisoryDraft(homeWorkId: $homeWorkId) {
      currentSourceRevision
      stale
      draft {
        id
        boundSourceRevision
        marker
        content
        author {
          id
        }
        creationDate
        updateDate
      }
    }
  }
`;

const current = (
  content = "Synthetic private evidence",
  revision: string | number = "revision-2",
  marker = "NEEDS_MORE_EVIDENCE"
) => ({
  currentSourceRevision: revision,
  stale: false,
  draft: {
    id: "draft-1",
    boundSourceRevision: revision,
    marker,
    content,
    author: { id: "synthetic-staff" },
    creationDate: "2026-10-06T10:00:00",
    updateDate: "2026-10-06T10:01:00",
  },
});

const card = (id = "hw1", updateDate = "2026-10-06T10:00:00") => ({
  id,
  updateDate,
  answer: "<p>Synthetic submission</p>",
  status: StudentHomeWorkStatus.InReview,
  lecture: { subject: "Synthetic lecture", contentHomeWork: "<p>Task</p>" },
  training: { techStack: "JAVA" },
  student: { id: "student-1", firstName: "Synthetic", lastName: "Student" },
  mentor: { id: "mentor-1", firstName: "Synthetic", lastName: "Mentor" },
});

type Request = {
  operation: Operation;
  reply: (result: FetchResult) => Promise<void>;
  fail: (error: Error) => Promise<void>;
};

const setup = (
  roles: UserRole[] = [UserRole.Mentor],
  userId: string | null = "mentor-1",
  cached?: ReturnType<typeof current>,
  variant:
    | "compact"
    | "mentor-full"
    | "shared-full"
    | "student-full" = "compact"
) => {
  userIdVar(userId);
  userRolesVar(roles);
  const requests: Request[] = [];
  const cache = new InMemoryCache();
  if (cached) {
    cache.writeQuery({
      query,
      variables: { homeWorkId: "hw1" },
      data: { homeWorkAdvisoryDraft: cached },
    });
  }
  const client = new ApolloClient({
    cache,
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
  const tree = (id = "hw1", updateDate?: string) => {
    const homework = card(id, updateDate);
    const fullViews = {
      "mentor-full": MentorHomeworkDetailsFull,
      "shared-full": SharedHomeworkDetailsFull,
      "student-full": StudentHomeworkDetailsFull,
    };
    const content =
      variant === "compact"
        ? h(HomeworkDetails, { card: homework, onClose: () => {} } as never)
        : h(fullViews[variant], { data: { homeWork: homework } } as never);
    return h(
      ApolloProvider,
      { client },
      h(
        MemoryRouter,
        {},
        h(ThemeProvider, { theme }, h(ModalProvider, {}, content))
      )
    );
  };
  const view = render(tree());
  const request = async (index = 0) => {
    await waitFor(() => assert.ok(requests[index]));
    return requests[index];
  };
  const reply = async (payload: unknown, index = 0) => {
    await (
      await request(index)
    ).reply({ data: { homeWorkAdvisoryDraft: payload } });
  };
  return { ...view, client, requests, request, reply, tree };
};

const region = () => screen.getByRole("region", { name: title });
const expectHiddenContent = (text = "Synthetic private evidence") => {
  assert.ok(
    screen.queryByText(text) === null,
    "Previous draft content must be hidden"
  );
  assert.ok(
    screen.queryByText(/Категория evidence: NEEDS_MORE_EVIDENCE/) === null,
    "Previous draft marker must be hidden"
  );
};

describe("private homework advisory read-only slice", () => {
  afterEach(() => {
    cleanup();
    userRolesVar([]);
    userIdVar(null);
    mock.restoreAll();
  });

  for (const variant of ["mentor-full", "shared-full"] as const) {
    it(`places the advisory before submission/comments in ${variant} without mutations`, async () => {
      const view = setup([UserRole.Mentor], "mentor-1", undefined, variant);
      await waitFor(() =>
        assert.ok(
          view.requests.some(
            ({ operation }) =>
              operation.operationName === "homeWorkAdvisoryDraft"
          )
        )
      );
      const advisory = view.requests.find(
        ({ operation }) => operation.operationName === "homeWorkAdvisoryDraft"
      )!;
      await advisory.reply({ data: { homeWorkAdvisoryDraft: current() } });
      assert.ok(within(region()).getByText("Synthetic private evidence"));
      const submission = screen.getByRole("heading", {
        name: "Ответ на задание",
      });
      assert.ok(
        region().compareDocumentPosition(submission) ===
          Node.DOCUMENT_POSITION_FOLLOWING
      );
      assert.ok(!region().contains(submission));
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

    for (const [role, id] of [
      [UserRole.Student, "student-1"],
      [null, null],
    ] as const) {
      it(`does not query advisory for ${
        role ?? "anonymous"
      } in ${variant}`, async () => {
        const view = setup(role ? [role] : [], id, undefined, variant);
        await act(async () => {
          await Promise.resolve();
        });
        assert.ok(screen.queryByRole("region", { name: title }) === null);
        assert.ok(
          view.requests.every(
            ({ operation }) =>
              operation.operationName !== "homeWorkAdvisoryDraft"
          )
        );
      });
    }
  }

  it("does not integrate the private block into the student view even for a staff viewer", async () => {
    const view = setup(
      [UserRole.Mentor],
      "mentor-1",
      undefined,
      "student-full"
    );
    await act(async () => {
      await Promise.resolve();
    });
    assert.ok(screen.queryByRole("region", { name: title }) === null);
    assert.ok(
      view.requests.every(
        ({ operation }) => operation.operationName !== "homeWorkAdvisoryDraft"
      )
    );
  });

  it("does not log advisory transport errors or their content through the real error link", async () => {
    const log = mock.method(console, "log", () => {});
    const warn = mock.method(console, "warn", () => {});
    const error = mock.method(console, "error", () => {});
    const view = setup();
    await (
      await view.request()
    ).fail(new Error("Synthetic private transport details"));
    assert.ok(
      within(region()).getByText(
        "Не удалось загрузить черновик. API недоступен или вернул ошибку."
      )
    );
    assert.equal(
      log.mock.calls.length + warn.mock.calls.length + error.mock.calls.length,
      0
    );
  });

  it("clears displayed content during a refetch and keeps it hidden after an API error", async () => {
    const view = setup();
    await view.reply(current());
    let refresh: Promise<unknown>;
    await act(async () => {
      refresh = view.client.refetchQueries({
        include: ["homeWorkAdvisoryDraft"],
      });
      refresh.catch(() => {});
      await Promise.resolve();
    });
    expectHiddenContent();
    assert.ok(within(region()).getByText("Загрузка черновика…"));
    await (await view.request(1)).fail(new Error("Synthetic unavailable"));
    await act(async () => {
      await refresh.catch(() => {});
    });
    expectHiddenContent();
    assert.ok(
      within(region()).getByText(
        "Не удалось загрузить черновик. API недоступен или вернул ошибку."
      )
    );
  });

  it("does not reuse an in-flight response when the same homework source changes", async () => {
    const view = setup();
    const old = await view.request();
    view.rerender(view.tree("hw1", "2026-10-06T11:00:00"));
    await view.reply(
      { ...current(), stale: true, currentSourceRevision: "revision-3" },
      1
    );
    await old.reply({ data: { homeWorkAdvisoryDraft: current() } });
    assert.ok(
      within(region()).getByText("Версия сдачи изменилась, черновик неактуален")
    );
    expectHiddenContent();
  });

  it("loads a separate mentor review block using only the contracted query", async () => {
    const view = setup();
    assert.ok(within(region()).getByText("Загрузка черновика…"));
    const { operation } = await view.request();
    assert.equal(operation.operationName, "homeWorkAdvisoryDraft");
    assert.deepEqual(operation.variables, { homeWorkId: "hw1" });
    await view.reply(current());
    assert.ok(within(region()).getByText("Synthetic private evidence"));
    assert.ok(
      within(region()).getByText("Категория evidence: NEEDS_MORE_EVIDENCE")
    );
    assert.ok(within(region()).getByText(/не оценка и не рекомендация зачёта/));
    assert.ok(within(region()).getByText(/Текущая версия сдачи: revision-2/));
    assert.ok(within(region()).getByText(/Версия черновика: revision-2/));
    assert.ok(screen.getByText("На проверке"));
    assert.ok(
      within(region()).getByRole("button", {
        name: "Редактировать приватный черновик",
      })
    );
    assert.equal(
      region().querySelector('[contenteditable="true"], textarea, input'),
      null
    );
    assert.deepEqual(
      view.requests.map(({ operation }) => operation.operationName),
      ["homeWorkAdvisoryDraft"]
    );
    assert.deepEqual(view.client.cache.extract(), {});
    assert.equal(window.localStorage.length, 0);
  });

  it("renders empty only for an explicit null draft with its current revision", async () => {
    const view = setup();
    await view.reply({
      currentSourceRevision: "revision-3",
      stale: false,
      draft: null,
    });
    assert.ok(within(region()).getByText("Черновик пока отсутствует"));
    assert.ok(within(region()).getByText(/Текущая версия сдачи: revision-3/));
    expectHiddenContent();
  });

  it("renders stale binding metadata without marker or content", async () => {
    const view = setup();
    await view.reply({
      ...current(),
      currentSourceRevision: "revision-3",
      stale: true,
      draft: { ...current().draft, marker: null, content: null },
    });
    assert.ok(
      within(region()).getByText("Версия сдачи изменилась, черновик неактуален")
    );
    assert.ok(within(region()).getByText(/Версия черновика: revision-2/));
    expectHiddenContent();
  });

  it("never renders stale payload content even if a response includes it", async () => {
    const view = setup();
    await view.reply({ ...current(), stale: true });
    assert.ok(
      within(region()).getByText("Версия сдачи изменилась, черновик неактуален")
    );
    expectHiddenContent();
  });

  for (const classification of ["FORBIDDEN", "UNAUTHORIZED"]) {
    it(`renders object access denied for ${classification} without exposing raw errors`, async () => {
      const view = setup();
      await (
        await view.request()
      ).reply({
        data: { homeWorkAdvisoryDraft: current() },
        errors: [
          new GraphQLError("Synthetic private server details", {
            extensions: { classification },
          }),
        ],
      });
      assert.ok(
        within(region()).getByText("Нет доступа к черновику этой сдачи")
      );
      expectHiddenContent();
      assert.equal(
        screen.queryByText(/Synthetic private server details/),
        null
      );
      assert.equal(screen.queryByText("Черновик пока отсутствует"), null);
    });
  }

  it("renders HTTP 403 as denied", async () => {
    const view = setup();
    await (
      await view.request()
    ).fail(Object.assign(new Error("Synthetic denied"), { statusCode: 403 }));
    assert.ok(within(region()).getByText("Нет доступа к черновику этой сдачи"));
    expectHiddenContent();
  });

  it("renders a missing endpoint as an API error, never empty", async () => {
    const view = setup();
    await (
      await view.request()
    ).reply({
      errors: [new GraphQLError("Cannot query field homeWorkAdvisoryDraft")],
    });
    assert.ok(
      within(region()).getByText(
        "Не удалось загрузить черновик. API недоступен или вернул ошибку."
      )
    );
    assert.equal(screen.queryByText("Черновик пока отсутствует"), null);
    assert.equal(screen.queryByText(/Cannot query field/), null);
  });

  it("renders transport errors without raw server details or cached content", async () => {
    const view = setup([UserRole.Mentor], "mentor-1", current());
    expectHiddenContent();
    await (
      await view.request()
    ).fail(new Error("Synthetic private server details"));
    assert.ok(
      within(region()).getByText(
        "Не удалось загрузить черновик. API недоступен или вернул ошибку."
      )
    );
    expectHiddenContent();
    assert.equal(screen.queryByText(/Synthetic private server details/), null);
    assert.equal(screen.queryByText("Черновик пока отсутствует"), null);
  });

  for (const payload of [
    null,
    {},
    { currentSourceRevision: "revision-2", stale: false },
  ]) {
    it(`does not treat a malformed response ${JSON.stringify(
      payload
    )} as empty`, async () => {
      const view = setup();
      await view.reply(payload);
      assert.ok(
        within(region()).getByText(
          "Не удалось загрузить черновик. API недоступен или вернул ошибку."
        )
      );
      assert.equal(screen.queryByText("Черновик пока отсутствует"), null);
    });
  }

  for (const [label, roles, id] of [
    ["student", [UserRole.Student], "student-1"],
    ["anonymous", [], null],
    ["anonymous with stale staff roles", [UserRole.Mentor], null],
  ] as const) {
    it(`does not render or query for ${label}`, async () => {
      const view = setup([...roles], id);
      await act(async () => {});
      assert.equal(screen.queryByRole("region", { name: title }), null);
      assert.deepEqual(view.requests, []);
    });
  }

  for (const role of [UserRole.Admin, UserRole.Lector]) {
    it(`uses the existing staff gate for ${role}`, async () => {
      const view = setup([role]);
      await view.reply(current());
      assert.ok(within(region()).getByText("Synthetic private evidence"));
    });
  }

  it("ignores cached current content when the server reports stale", async () => {
    const view = setup([UserRole.Mentor], "mentor-1", current());
    expectHiddenContent();
    await view.reply({
      ...current(),
      stale: true,
      currentSourceRevision: "revision-3",
    });
    assert.ok(
      within(region()).getByText("Версия сдачи изменилась, черновик неактуален")
    );
    expectHiddenContent();
  });

  it("clears current content synchronously when homework changes", async () => {
    const view = setup();
    await view.reply(current());
    view.rerender(view.tree("hw2"));
    expectHiddenContent();
    assert.ok(within(region()).getByText("Загрузка черновика…"));
    const next = await view.request(1);
    assert.deepEqual(next.operation.variables, { homeWorkId: "hw2" });
    await view.reply(current("Second homework evidence"), 1);
    assert.ok(within(region()).getByText("Second homework evidence"));
    assert.ok(screen.queryByText("Synthetic private evidence") === null);
  });

  it("does not put a late old-homework response into the new card", async () => {
    const view = setup();
    const old = await view.request();
    view.rerender(view.tree("hw2"));
    await view.reply(current("Second homework evidence"), 1);
    await old.reply({ data: { homeWorkAdvisoryDraft: current() } });
    assert.ok(within(region()).getByText("Second homework evidence"));
    assert.ok(screen.queryByText("Synthetic private evidence") === null);
  });

  it("invalidates the draft on a same-homework submission update", async () => {
    const view = setup();
    await view.reply(current());
    view.rerender(view.tree("hw1", "2026-10-06T11:00:00"));
    expectHiddenContent();
    await view.reply(
      { ...current(), stale: true, currentSourceRevision: "revision-3" },
      1
    );
    assert.ok(
      within(region()).getByText("Версия сдачи изменилась, черновик неактуален")
    );
    expectHiddenContent();
  });

  it("clears content on staff identity change and does not reuse it after denied", async () => {
    const view = setup();
    await view.reply(current());
    act(() => userIdVar("mentor-2"));
    expectHiddenContent();
    await (
      await view.request(1)
    ).reply({
      errors: [
        new GraphQLError("Access Denied", {
          extensions: { errorType: "FORBIDDEN" },
        }),
      ],
    });
    assert.ok(within(region()).getByText("Нет доступа к черновику этой сдачи"));
    expectHiddenContent();
  });

  it("hides the block when staff access is removed during a request", async () => {
    const view = setup();
    const pending = await view.request();
    act(() => userRolesVar([UserRole.Student]));
    await pending.reply({ data: { homeWorkAdvisoryDraft: current() } });
    assert.equal(screen.queryByRole("region", { name: title }), null);
    expectHiddenContent();
    assert.equal(view.requests.length, 1);
  });

  it("escapes HTML and leaves Markdown inert without review/save mutations", async () => {
    const text =
      '<img src=x onerror="window.syntheticAttack=true">\n<script>syntheticAttack()</script>\n**evidence** [link](javascript:syntheticAttack())';
    const view = setup();
    await view.reply(current(text));
    const content = within(region()).getByText(/syntheticAttack\(\)<\/script>/);
    assert.equal(content.textContent, text);
    assert.equal(content.querySelector("img, script, a, strong"), null);
    assert.match(content.innerHTML, /&lt;img/);
    assert.ok(
      within(region()).getByRole("button", {
        name: "Редактировать приватный черновик",
      })
    );
    assert.equal(
      region().querySelector('[contenteditable="true"], textarea, input'),
      null
    );
    assert.deepEqual(
      view.requests.map(({ operation }) => operation.operationName),
      ["homeWorkAdvisoryDraft"]
    );
  });
});

describe("private homework advisory manual editor", () => {
  const EDIT = "Редактировать приватный черновик";
  const SAVE = "Сохранить приватный черновик";
  const REFRESH = "Обновить контекст";
  const NOT_SAVED = /Не сохранено/;
  const DENIED = "Нет доступа к черновику этой сдачи";

  afterEach(() => {
    cleanup();
    userRolesVar([]);
    userIdVar(null);
    mock.restoreAll();
  });

  const openEditor = () => {
    fireEvent.click(within(region()).getByRole("button", { name: EDIT }));
    return within(region()).findByRole("textbox");
  };
  const pickMarker = async (value: string) => {
    fireEvent.mouseDown(within(region()).getByRole("combobox"));
    fireEvent.click(await screen.findByText(value));
  };
  const clickSave = () =>
    fireEvent.click(within(region()).getByRole("button", { name: SAVE }));
  const saveRequests = (view: ReturnType<typeof setup>) =>
    view.requests.filter(
      ({ operation }) => operation.operationName === "saveHomeWorkAdvisoryDraft"
    );
  const saveRequest = async (view: ReturnType<typeof setup>) => {
    await waitFor(() => assert.ok(saveRequests(view).length > 0));
    return saveRequests(view)[0];
  };
  const savedResponse = (
    content: string,
    marker = "SOURCE_PARTIAL",
    revision = 2
  ) => ({
    currentSourceRevision: revision,
    stale: false,
    draft: {
      id: "draft-9",
      boundSourceRevision: revision,
      marker,
      content,
      author: { id: "mentor-1" },
      creationDate: "2026-10-06T12:00:00",
      updateDate: "2026-10-06T12:00:00",
    },
  });

  it("creates the first draft only on an explicit save and shows the confirmed response", async () => {
    const view = setup();
    await view.reply({ currentSourceRevision: 2, stale: false, draft: null });
    assert.ok(within(region()).getByText("Черновик пока отсутствует"));

    const textarea = (await openEditor()) as HTMLTextAreaElement;
    assert.ok(within(region()).getByText(/Ручной черновик.*не автогенерация/));
    fireEvent.change(textarea, { target: { value: "Mentor-written note" } });
    await pickMarker("SOURCE_PARTIAL");
    assert.deepEqual(saveRequests(view), []);
    clickSave();

    const save = await saveRequest(view);
    assert.deepEqual(save.operation.variables, {
      homeWorkId: "hw1",
      marker: "SOURCE_PARTIAL",
      content: "Mentor-written note",
      baseSourceRevision: 2,
    });
    await save.reply({
      data: { saveHomeWorkAdvisoryDraft: savedResponse("Mentor-written note") },
    });
    assert.ok(within(region()).getByText("Mentor-written note"));
    assert.ok(within(region()).getByText("Категория evidence: SOURCE_PARTIAL"));
    assert.equal(within(region()).queryByRole("textbox"), null);
    assert.equal(screen.queryByText("Черновик пока отсутствует"), null);
    assert.deepEqual(
      view.requests.map(({ operation }) => operation.operationName),
      ["homeWorkAdvisoryDraft", "saveHomeWorkAdvisoryDraft"]
    );
    assert.ok(
      view.requests.every(
        ({ operation }) =>
          ![
            "sendComment",
            "answerComment",
            "updateComment",
            "approved",
            "notApproved",
          ].includes(operation.operationName)
      )
    );
    assert.deepEqual(view.client.cache.extract(), {});
    assert.equal(window.localStorage.length, 0);
  });

  it("prefills marker and content from the current draft and saves edits", async () => {
    const view = setup();
    await view.reply(
      current("Synthetic private evidence", 2, "SOURCE_CONFIRMED")
    );
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    assert.equal(textarea.value, "Synthetic private evidence");
    assert.ok(
      within(region())
        .getByRole("combobox")
        .textContent?.includes("SOURCE_CONFIRMED")
    );
    fireEvent.change(textarea, { target: { value: "Updated note" } });
    clickSave();
    const save = await saveRequest(view);
    assert.deepEqual(save.operation.variables, {
      homeWorkId: "hw1",
      marker: "SOURCE_CONFIRMED",
      content: "Updated note",
      baseSourceRevision: 2,
    });
    await save.reply({
      data: {
        saveHomeWorkAdvisoryDraft: savedResponse(
          "Updated note",
          "SOURCE_CONFIRMED"
        ),
      },
    });
    assert.ok(within(region()).getByText("Updated note"));
  });

  it("discards edits on cancel without a mutation", async () => {
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Changed but cancelled" } });
    fireEvent.click(within(region()).getByRole("button", { name: "Отмена" }));
    assert.equal(within(region()).queryByRole("textbox"), null);
    assert.ok(within(region()).getByText("Original"));
    assert.equal(screen.queryByText("Changed but cancelled"), null);
    assert.deepEqual(
      view.requests.map(({ operation }) => operation.operationName),
      ["homeWorkAdvisoryDraft"]
    );
  });

  it("blocks blank and over-limit content client-side without a mutation", async () => {
    const view = setup();
    await view.reply(current("x", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "   " } });
    clickSave();
    assert.ok(within(region()).getByText("Введите текст черновика"));
    fireEvent.change(textarea, { target: { value: "x".repeat(4001) } });
    clickSave();
    assert.ok(within(region()).getByText(/4000/));
    fireEvent.change(textarea, { target: { value: "x".repeat(4000) } });
    clickSave();
    const save = await saveRequest(view);
    assert.equal(saveRequests(view).length, 1);
    await save.reply({
      data: {
        saveHomeWorkAdvisoryDraft: savedResponse(
          "x".repeat(4000),
          "SOURCE_CONFIRMED"
        ),
      },
    });
  });

  it("keeps the unsaved text on a server failure and never retries automatically", async () => {
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Retained unsaved" } });
    clickSave();
    const save = await saveRequest(view);
    await save.reply({
      errors: [
        new GraphQLError("Invalid homework state", {
          extensions: { classification: "BAD_REQUEST" },
        }),
      ],
    });
    assert.ok(within(region()).getByText(NOT_SAVED));
    assert.equal(screen.queryByText(/Invalid homework state/), null);
    assert.equal(
      (within(region()).getByRole("textbox") as HTMLTextAreaElement).value,
      "Retained unsaved"
    );
    assert.equal(saveRequests(view).length, 1);
  });

  it("reports denied saves as denied and keeps the draft text", async () => {
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Denied note" } });
    clickSave();
    const save = await saveRequest(view);
    await save.reply({
      errors: [
        new GraphQLError("Access Denied", {
          extensions: { errorType: "FORBIDDEN" },
        }),
      ],
    });
    assert.ok(within(region()).getByText(DENIED));
    assert.equal(
      (within(region()).getByRole("textbox") as HTMLTextAreaElement).value,
      "Denied note"
    );
  });

  it("does not log save transport errors or their content through the real error link", async () => {
    const log = mock.method(console, "log", () => {});
    const warn = mock.method(console, "warn", () => {});
    const error = mock.method(console, "error", () => {});
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, {
      target: { value: "Private note never logged" },
    });
    clickSave();
    const save = await saveRequest(view);
    await save.fail(new Error("Synthetic private transport details"));
    assert.ok(within(region()).getByText(NOT_SAVED));
    assert.equal(
      log.mock.calls.length + warn.mock.calls.length + error.mock.calls.length,
      0
    );
  });

  it("blocks saving after the read context moved until an explicit context refresh", async () => {
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Checked note" } });

    let refresh: Promise<unknown> | undefined;
    await act(async () => {
      refresh = view.client.refetchQueries({
        include: ["homeWorkAdvisoryDraft"],
      });
      refresh.catch(() => {});
      await Promise.resolve();
    });
    await view.reply(
      { currentSourceRevision: 3, stale: false, draft: null },
      1
    );
    await act(async () => {
      await refresh?.catch(() => {});
    });

    const movedTextbox = (await within(region()).findByRole(
      "textbox"
    )) as HTMLTextAreaElement;
    assert.equal(movedTextbox.value, "Checked note");
    assert.ok(within(region()).getByText(/перепроверьте текст/));
    const saveButton = within(region()).getByRole("button", {
      name: SAVE,
    }) as HTMLButtonElement;
    assert.ok(saveButton.disabled);
    assert.deepEqual(saveRequests(view), []);

    fireEvent.click(within(region()).getByRole("button", { name: REFRESH }));
    const enabledSave = within(region()).getByRole("button", {
      name: SAVE,
    }) as HTMLButtonElement;
    assert.ok(!enabledSave.disabled);
    clickSave();
    const save = await saveRequest(view);
    assert.equal(save.operation.variables.baseSourceRevision, 3);
    assert.equal(save.operation.variables.content, "Checked note");
  });

  it("ignores a second save click while the request is pending", async () => {
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Pending note" } });
    const button = within(region()).getByRole("button", { name: SAVE });
    fireEvent.click(button);
    fireEvent.click(button);
    const save = await saveRequest(view);
    assert.equal(saveRequests(view).length, 1);
    await save.reply({
      data: { saveHomeWorkAdvisoryDraft: savedResponse("Pending note") },
    });
    assert.equal(within(region()).queryByRole("textbox"), null);
  });

  it("drops the editor on homework switch and ignores the late save response", async () => {
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Unsaved hw1" } });
    clickSave();
    const save = await saveRequest(view);

    view.rerender(view.tree("hw2"));
    assert.equal(screen.queryByRole("textbox"), null);
    assert.ok(within(region()).getByText("Загрузка черновика…"));
    await view.request(2);
    await view.reply(current("Second homework evidence", 5), 2);
    await save.reply({
      data: { saveHomeWorkAdvisoryDraft: savedResponse("Unsaved hw1") },
    });
    assert.ok(within(region()).getByText("Second homework evidence"));
    assert.equal(screen.queryByText("Unsaved hw1"), null);
    assert.equal(within(region()).queryByRole("textbox"), null);
    assert.deepEqual(
      view.requests.map(({ operation }) => operation.operationName),
      [
        "homeWorkAdvisoryDraft",
        "saveHomeWorkAdvisoryDraft",
        "homeWorkAdvisoryDraft",
      ]
    );
  });

  it("clears the editor when the staff identity changes", async () => {
    const view = setup();
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"));
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Mentor one draft" } });
    act(() => userIdVar("mentor-2"));
    assert.equal(screen.queryByRole("textbox"), null);
    await view.request(1);
    await view.reply(current("Original", 2, "SOURCE_CONFIRMED"), 1);
    assert.equal(screen.queryByText("Mentor one draft"), null);
    assert.equal(within(region()).queryByRole("textbox"), null);
  });

  it("opens an empty editor on a stale draft without restoring hidden content", async () => {
    const view = setup();
    await view.reply({
      currentSourceRevision: 3,
      stale: true,
      draft: {
        ...current("Hidden stale", 2).draft,
        marker: null,
        content: null,
      },
    });
    const textarea = (await openEditor()) as HTMLTextAreaElement;
    assert.equal(textarea.value, "");
    clickSave();
    assert.ok(within(region()).getByText(/категорию evidence/i));
    assert.deepEqual(saveRequests(view), []);
  });

  it("offers no editor and no mutation when the read is denied", async () => {
    const view = setup();
    await (
      await view.request()
    ).reply({
      errors: [
        new GraphQLError("Access Denied", {
          extensions: { errorType: "FORBIDDEN" },
        }),
      ],
    });
    assert.ok(within(region()).getByText(DENIED));
    assert.equal(within(region()).queryByRole("button", { name: EDIT }), null);
    assert.equal(within(region()).queryByRole("textbox"), null);
    assert.deepEqual(saveRequests(view), []);
  });
});
