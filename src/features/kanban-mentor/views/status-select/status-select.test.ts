import "../../../../../test-setup/jsdom-env.mjs";

import assert from "node:assert/strict";
import { describe, it, mock, afterEach } from "node:test";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";

import { createCustomTheme, initialSettings } from "theme";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

import StatusSelect from "./status-select";
import ReturnForReworkDialog from "./return-for-rework-dialog";

const h = React.createElement;
const theme = createCustomTheme(initialSettings);

type Responder = (operation: {
  operationName: string;
  variables: Record<string, unknown>;
}) =>
  | { data: Record<string, unknown> }
  | { delay: number; data: Record<string, unknown> }
  | Error;

const makeClient = (calls: string[], respond: Responder) => {
  const link = new ApolloLink(
    (operation) =>
      new Observable((observer) => {
        calls.push(operation.operationName);
        let result: ReturnType<Responder> | Error;
        try {
          result = respond(operation);
        } catch (error) {
          result = error as Error;
        }
        const emit = () => {
          if (result instanceof Error) {
            observer.error(result);
          } else {
            observer.next(result as never);
            observer.complete();
          }
        };
        const delay = "delay" in result ? result.delay : 0;
        if (delay > 0) setTimeout(emit, delay);
        else emit();
      })
  );
  return new ApolloClient({ link, cache: new InMemoryCache() });
};

const userDto = (id: string) => ({
  __typename: "UserDto",
  id,
  firstName: "First",
  lastName: "Last",
  avatar: null,
  rating: { __typename: "RatingUserDto", rating: 5 },
});

const homeworkDto = (status: string) => ({
  __typename: "StudentHomeWorkDto",
  id: "hw1",
  status,
  lecture: {
    __typename: "LectureInfoDto",
    id: "l1",
    subject: "Lecture",
    contentHomeWork: "do it",
  },
  training: { __typename: "TrainingDto", techStack: "JAVA" },
  student: userDto("s1"),
  mentor: userDto("m1"),
  answer: null,
  creationDate: "2026-01-01T00:00:00",
  updateDate: "2026-01-01T00:00:00",
  startCheckingDate: null,
  endCheckingDate: null,
  contourHandle: null,
  contourCheckVerdict: null,
  contourCheckComment: null,
  contourCheckedAt: null,
  contourEvidence: null,
});

const commentDto = (id: string, content: string) => ({
  __typename: "CommentHomeWorkDto",
  id,
  creator: userDto("m1"),
  creationDate: "2026-01-01T00:00:00",
  content,
  userLike: false,
  likes: 0,
  children: [],
});

const okResponders = (): Responder => (operation) => {
  switch (operation.operationName) {
    case "sendComment":
      return { data: { sendComment: commentDto("c1", "<p>fix tests</p>") } };
    case "updateComment":
      return {
        data: { updateComment: { __typename: "CommentHomeWorkDto", id: "c1" } },
      };
    case "notApproved":
      return { data: { notApproved: homeworkDto("NOT_APPROVED") } };
    case "approved":
      return { data: { approved: homeworkDto("APPROVED") } };
    case "homeWork":
      return { data: { homeWork: homeworkDto("NOT_APPROVED") } };
    default:
      return { data: {} };
  }
};

const renderWithClient = (
  client: ApolloClient<object>,
  node: React.ReactNode
) =>
  render(
    h(ApolloProvider, { client }, h(ThemeProvider, { theme }, node as never))
  );

// waitFor's timeout path formats the whole jsdom tree and hangs under
// node:test, so poll manually instead.
const until = async (check: () => boolean, timeoutMs = 3000) => {
  const startedAt = Date.now();
  for (;;) {
    if (check()) return;
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error("timed out while polling");
    }
    await new Promise((resolve) => setTimeout(resolve, 30));
  }
};

const openSelectAndPick = async (itemText: string) => {
  const combobox = await screen.findByRole("combobox");
  fireEvent.mouseDown(combobox);
  const item = await screen.findByText(itemText);
  fireEvent.click(item);
  return combobox;
};

describe("StatusSelect", () => {
  afterEach(() => cleanup());

  it("opens the feedback dialog instead of flipping the status immediately", async () => {
    const calls: string[] = [];
    renderWithClient(
      makeClient(calls, okResponders()),
      h(StatusSelect, {
        currentStatus: StudentHomeWorkStatus.InReview,
        homeworkId: "hw1",
      })
    );

    const combobox = await openSelectAndPick("Не принято");

    await screen.findByText("Опишите, что нужно исправить");
    assert.ok(combobox.textContent?.includes("На проверке"));
    assert.deepEqual(calls, []);
  });

  it("cancels the rework dialog without sending anything", async () => {
    const calls: string[] = [];
    renderWithClient(
      makeClient(calls, okResponders()),
      h(StatusSelect, {
        currentStatus: StudentHomeWorkStatus.InReview,
        homeworkId: "hw1",
      })
    );

    await openSelectAndPick("Не принято");
    const cancel = await screen.findByRole("button", { name: "Отмена" });
    fireEvent.click(cancel);

    await until(
      () => screen.queryByText("Опишите, что нужно исправить") === null
    );
    assert.deepEqual(calls, []);
  });

  it("shows the new status only after the server confirms it", async () => {
    const calls: string[] = [];
    const respond: Responder = (operation) => {
      if (operation.operationName === "approved") {
        return { delay: 80, data: { approved: homeworkDto("APPROVED") } };
      }
      return okResponders()(operation);
    };
    renderWithClient(
      makeClient(calls, respond),
      h(StatusSelect, {
        currentStatus: StudentHomeWorkStatus.InReview,
        homeworkId: "hw1",
      })
    );

    const combobox = await openSelectAndPick("Принято");

    assert.deepEqual(calls, ["approved"]);
    assert.ok(combobox.textContent?.includes("На проверке"));

    await until(() => !!combobox.textContent?.includes("Принято"));
  });

  it("ignores a late status response after switching homework", async () => {
    const calls: string[] = [];
    const respond: Responder = (operation) => {
      if (operation.operationName === "approved") {
        return { delay: 150, data: { approved: homeworkDto("APPROVED") } };
      }
      return okResponders()(operation);
    };
    const client = makeClient(calls, respond);
    const view = renderWithClient(
      client,
      h(StatusSelect, {
        currentStatus: StudentHomeWorkStatus.InReview,
        homeworkId: "hw1",
      })
    );

    await openSelectAndPick("Принято");
    view.rerender(
      h(
        ApolloProvider,
        { client },
        h(
          ThemeProvider,
          { theme },
          h(StatusSelect, {
            currentStatus: StudentHomeWorkStatus.InReview,
            homeworkId: "hw2",
          }) as never
        )
      )
    );

    await until(() => calls.includes("approved"));
    await new Promise((resolve) => setTimeout(resolve, 250));

    const combobox = await screen.findByRole("combobox");
    assert.ok(combobox.textContent?.includes("На проверке"));
  });
});

const makeFlakyNotApproved = (): Responder => {
  let attempts = 0;
  return (operation) => {
    if (operation.operationName === "notApproved") {
      attempts += 1;
      if (attempts === 1) return new Error("status failed");
    }
    if (operation.operationName === "homeWork") {
      return { data: { homeWork: homeworkDto("IN_REVIEW") } };
    }
    return okResponders()(operation);
  };
};

describe("ReturnForReworkDialog", () => {
  afterEach(() => cleanup());

  const renderDialog = (
    respond: Responder,
    props: Record<string, unknown> = {}
  ) => {
    const calls: string[] = [];
    const onDone = mock.fn();
    const onClose = mock.fn();
    const view = renderWithClient(
      makeClient(calls, respond),
      h(ReturnForReworkDialog, {
        homeworkId: "hw1",
        open: true,
        onDone,
        onClose,
        ...props,
      })
    );
    return { calls, onDone, onClose, view };
  };

  const confirmButton = () =>
    screen.findByRole("button", {
      name: /Отправить и вернуть|Повторить возврат/,
    });

  it("runs sendComment then notApproved on confirm", async () => {
    const { calls, onDone } = renderDialog(okResponders(), {
      initialContent: "<p>fix tests</p>",
    });

    fireEvent.click(await confirmButton());

    await until(() => onDone.mock.callCount() === 1);
    assert.deepEqual(calls, ["sendComment", "notApproved"]);
    assert.deepEqual(onDone.mock.calls[0].arguments, [
      StudentHomeWorkStatus.NotApproved,
    ]);
  });

  it("does not send anything on cancel", async () => {
    const { calls, onClose, onDone } = renderDialog(okResponders(), {
      initialContent: "<p>fix tests</p>",
    });

    fireEvent.click(await screen.findByRole("button", { name: "Отмена" }));

    assert.equal(onClose.mock.callCount(), 1);
    assert.equal(onDone.mock.callCount(), 0);
    assert.deepEqual(calls, []);
  });

  it("rejects an empty comment without calling mutations", async () => {
    const { calls, onDone } = renderDialog(okResponders());

    fireEvent.click(await confirmButton());
    await screen.findByText("Введите текст");

    assert.deepEqual(calls, []);
    assert.equal(onDone.mock.callCount(), 0);
  });

  it("keeps the form open with an error when sendComment fails", async () => {
    const respond: Responder = (operation) => {
      if (operation.operationName === "sendComment") {
        return new Error("send failed");
      }
      return okResponders()(operation);
    };
    const { calls, onDone } = renderDialog(respond, {
      initialContent: "<p>fix tests</p>",
    });

    fireEvent.click(await confirmButton());
    await screen.findByText(/Не удалось сохранить комментарий/);

    assert.deepEqual(calls, ["sendComment"]);
    assert.equal(onDone.mock.callCount(), 0);
  });

  it("shows a partial result and does not resend the comment on retry", async () => {
    const { calls, onDone } = renderDialog(makeFlakyNotApproved(), {
      initialContent: "<p>fix tests</p>",
    });

    fireEvent.click(await confirmButton());
    await screen.findByText(/Комментарий сохранён/);

    assert.deepEqual(calls, ["sendComment", "notApproved", "homeWork"]);

    calls.length = 0;
    fireEvent.click(await confirmButton());

    await until(() => onDone.mock.callCount() === 1);
    assert.deepEqual(calls, ["notApproved"]);
  });

  it("does not call notApproved while the comment sync is incomplete", async () => {
    let fetches = 0;
    const realFetch = globalThis.fetch;
    globalThis.fetch = (() => {
      fetches += 1;
      return Promise.reject(new Error("no blob in tests"));
    }) as never;

    try {
      const { calls, onDone } = renderDialog(okResponders(), {
        initialContent:
          '<p>see file<file-node href="blob:local-1" fileName="shot.png"></file-node></p>',
      });

      fireEvent.click(await confirmButton());
      await screen.findByText(/не синхронизированы/);

      assert.deepEqual(calls, ["sendComment"]);
      assert.equal(onDone.mock.callCount(), 0);
      assert.equal(fetches, 1);

      fireEvent.click(await confirmButton());
      await until(() => fetches === 2);

      assert.equal(calls.filter((name) => name === "sendComment").length, 1);
      assert.equal(calls.filter((name) => name === "notApproved").length, 0);
      assert.equal(onDone.mock.callCount(), 0);
    } finally {
      globalThis.fetch = realFetch;
    }
  });

  it("keeps homework B state when a late submit for A resolves", async () => {
    const respond: Responder = (operation) => {
      if (operation.operationName === "sendComment") {
        return {
          delay: 150,
          data: { sendComment: commentDto("cA", "<p>x</p>") },
        };
      }
      return okResponders()(operation);
    };
    const { calls, onDone, view } = renderDialog(respond, {
      initialContent: "<p>x</p>",
    });

    fireEvent.click(await confirmButton());
    await until(() => calls.includes("sendComment"));

    view.rerender(
      h(
        ApolloProvider,
        { client: makeClient(calls, respond) },
        h(
          ThemeProvider,
          { theme },
          h(ReturnForReworkDialog, {
            homeworkId: "hw2",
            open: true,
            onDone,
            onClose: () => {},
            initialContent: "<p>another homework</p>",
          }) as never
        )
      )
    );

    await until(() => calls.includes("notApproved"));

    assert.equal(onDone.mock.callCount(), 0);
    assert.equal(screen.queryByText(/Комментарий уже сохранён/), null);

    calls.length = 0;
    fireEvent.click(await confirmButton());

    await until(() => onDone.mock.callCount() === 1);
    assert.deepEqual(calls, ["sendComment", "notApproved"]);
    assert.deepEqual(onDone.mock.calls[0].arguments, [
      StudentHomeWorkStatus.NotApproved,
    ]);
  });

  it("blocks a double click while the request is in flight", async () => {
    const respond: Responder = (operation) => {
      if (operation.operationName === "sendComment") {
        return {
          delay: 120,
          data: { sendComment: commentDto("c1", "<p>x</p>") },
        };
      }
      return okResponders()(operation);
    };
    const { calls, onDone } = renderDialog(respond, {
      initialContent: "<p>fix tests</p>",
    });

    const button = await confirmButton();
    fireEvent.click(button);
    fireEvent.click(button);

    await until(() => onDone.mock.callCount() === 1);
    assert.deepEqual(
      calls.filter((name) => name === "sendComment"),
      ["sendComment"]
    );
  });

  it("does not reuse the comment receipt for a different homework", async () => {
    const respond = makeFlakyNotApproved();
    const { calls, view } = renderDialog(respond, {
      initialContent: "<p>fix tests</p>",
    });

    fireEvent.click(await confirmButton());
    await screen.findByText(/Комментарий сохранён/);

    view.rerender(
      h(
        ApolloProvider,
        { client: makeClient(calls, respond) },
        h(
          ThemeProvider,
          { theme },
          h(ReturnForReworkDialog, {
            homeworkId: "hw2",
            open: true,
            onDone: () => {},
            onClose: () => {},
            initialContent: "<p>another homework</p>",
          }) as never
        )
      )
    );

    calls.length = 0;
    fireEvent.click(await confirmButton());

    await until(() => calls.includes("sendComment"));
    assert.equal(calls[0], "sendComment");
  });
});
