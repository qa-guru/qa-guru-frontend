import "../../../../test-setup/jsdom-env.mjs";

import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { afterEach, describe, it, mock } from "node:test";
import { AxiosError } from "axios";
import type { Editor } from "@tiptap/core";
import { SnackbarProvider } from "notistack";
import React from "react";
import { act, cleanup, renderHook } from "@testing-library/react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
} from "@apollo/client";

import HomeworkCommentFileService from "api/rest/homework-comment-serivce";
import { useHomeworkCommentFileDelete } from "shared/hooks/use-homework-comment-file-delete";

import { CommentContentSyncError } from "./submit-homework-comment";
import type useSendHomeworkCommentType from "./use-send-homework-comment";

const useSendHomeworkComment: typeof useSendHomeworkCommentType = (() => {
  const require = createRequire(import.meta.url);
  const config = require.cache[require.resolve("config")]!;
  const original = config.exports;
  config.exports = {
    ...original,
    HOMEWORK_COMMENT_FILE_GET_URI: "/homework/comment/:commentId/file/:fileId",
  };
  try {
    return require("./use-send-homework-comment").default;
  } finally {
    config.exports = original;
  }
})();

const draft = (html = "<p>feedback</p>") => ({
  editor: {
    getHTML: () => html,
    state: { doc: { descendants: () => true } },
  } as unknown as Editor,
  pendingFiles: [],
  deletedFileIds: [],
});

const commentDto = (id: string, content: string) => ({
  __typename: "CommentHomeWorkDto",
  id,
  content,
  creator: {
    __typename: "UserDto",
    id: "mentor-1",
    firstName: "Synthetic",
    lastName: "Mentor",
    avatar: null,
    rating: { __typename: "RatingUserDto", rating: 0 },
  },
  creationDate: "2026-10-03T12:00:00",
  userLike: false,
  likes: 0,
  children: [],
});

const setup = (
  options: { delay?: number; failSend?: boolean } = {},
  submitOptions: Record<string, unknown> = {}
) => {
  const calls: Array<{
    operationName: string;
    variables: Record<string, unknown>;
  }> = [];
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new ApolloLink(
      (operation) =>
        new Observable((observer) => {
          const { operationName, variables } = operation;
          calls.push({ operationName, variables });
          const emit = () => {
            if (operationName === "sendComment" && options.failSend) {
              observer.error(new Error("unconfirmed send response"));
              return;
            }
            const field =
              operationName === "sendComment" ? "sendComment" : "updateComment";
            observer.next({
              data: {
                [field]: commentDto(
                  String(variables.id ?? `comment-${variables.homeWorkId}`),
                  String(variables.content)
                ),
              },
            });
            observer.complete();
          };
          const timer = setTimeout(emit, options.delay ?? 0);
          return () => clearTimeout(timer);
        })
    ),
  });
  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      ApolloProvider,
      { client },
      React.createElement(
        SnackbarProvider,
        { autoHideDuration: null, preventDuplicate: true },
        children
      )
    );
  const view = renderHook(
    ({ homeworkId }) =>
      useSendHomeworkComment(homeworkId, submitOptions as never),
    {
      wrapper,
      initialProps: { homeworkId: "hw1" },
    }
  );
  return { ...view, calls };
};

const withUnavailableBlob = async (run: () => Promise<void>) => {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (() =>
    Promise.reject(new Error("synthetic blob unavailable"))) as never;
  try {
    await run();
  } finally {
    globalThis.fetch = realFetch;
  }
};

const deleteFailure = (message: string, status?: number) =>
  new AxiosError(
    message,
    status ? AxiosError.ERR_BAD_REQUEST : AxiosError.ERR_NETWORK,
    undefined,
    undefined,
    status ? ({ status, data: { message } } as never) : undefined
  );

const confirmedDelete = (data?: unknown) =>
  Promise.resolve({ status: 200, data } as never);

const mockUpload = () =>
  mock.method(HomeworkCommentFileService, "uploadFile", () =>
    Promise.resolve({ status: 200, data: { id: "42" } } as never)
  );

const attachmentDraft = () => ({
  ...draft(),
  pendingFiles: [
    { file: new File(["data"], "notes.txt"), localUrl: "blob:notes" },
  ],
  attachments: [{ href: "blob:notes", fileName: "notes.txt" }],
  deletedFileIds: ["7", "8"],
  uploadedFiles: [],
  confirmedDeletedFileIds: [],
});

const expectSyncError = async (run: () => Promise<unknown>) => {
  let error: unknown;
  await act(async () => {
    error = await run().catch((error: unknown) => error);
  });
  assert.ok(error instanceof CommentContentSyncError);
  return error;
};

describe("useSendHomeworkComment receipts", () => {
  afterEach(() => {
    cleanup();
    mock.restoreAll();
  });

  it("resumes an ordinary comment after confirmed creation and failed sync", async () => {
    await withUnavailableBlob(async () => {
      const { result, calls } = setup();
      await act(async () => {
        await assert.rejects(
          result.current.submit(
            draft('<p><file-node href="blob:missing"></file-node></p>')
          ),
          CommentContentSyncError
        );
      });
      await act(async () => {
        await result.current.submit(draft("<p>edited feedback</p>"));
      });
      assert.deepEqual(
        calls.map((call) => call.operationName),
        ["sendComment", "updateComment"]
      );
      assert.equal(calls[1].variables.id, "comment-hw1");
    });
  });

  it("does not reuse the receipt when the homework changes", async () => {
    await withUnavailableBlob(async () => {
      const { result, calls, rerender } = setup();
      await act(async () => {
        await assert.rejects(
          result.current.submit(
            draft('<p><file-node href="blob:missing"></file-node></p>')
          ),
          CommentContentSyncError
        );
      });
      rerender({ homeworkId: "hw2" });
      await act(async () => {
        await result.current.submit(draft());
      });
      assert.deepEqual(
        calls.map((call) => call.operationName),
        ["sendComment", "sendComment"]
      );
      assert.equal(calls[1].variables.homeWorkId, "hw2");
    });
  });

  it("coalesces concurrent submissions and clears the receipt after success", async () => {
    const { result, calls } = setup({ delay: 50 });
    await act(async () => {
      const first = result.current.submit(draft());
      const second = result.current.submit(draft());
      assert.deepEqual(await first, await second);
    });
    assert.equal(calls.length, 1);
    await act(async () => {
      await result.current.submit(draft("<p>another comment</p>"));
    });
    assert.deepEqual(
      calls.map((call) => call.operationName),
      ["sendComment", "sendComment"]
    );
  });

  it("uses the configured reply mutation instead of creating a root comment", async () => {
    const created: string[] = [];
    const { result, calls } = setup(
      {},
      {
        scope: "reply:parent-1",
        sendComment: ({ variables }: { variables: { content: string } }) => {
          created.push(variables.content);
          return Promise.resolve({
            data: { sendComment: commentDto("reply-1", variables.content) },
          });
        },
      }
    );
    await act(async () => {
      assert.equal((await result.current.submit(draft())).commentId, "reply-1");
    });
    assert.deepEqual(created, ["<p>feedback</p>"]);
    assert.deepEqual(calls, []);
  });

  it("updates a scoped existing comment without requiring a homework create", async () => {
    const updates: Array<Record<string, unknown>> = [];
    const { result, calls, rerender } = setup(
      {},
      {
        scope: "comment:c9",
        updateComment: ({
          variables,
        }: {
          variables: Record<string, unknown>;
        }) => {
          updates.push(variables);
          return Promise.resolve({
            data: {
              updateComment: commentDto("c9", String(variables.content)),
            },
          });
        },
      }
    );
    rerender({ homeworkId: "" });
    await act(async () => {
      await result.current.submit({
        ...draft("<p>edited</p>"),
        commentId: "c9",
        sentHtml: "<p>original</p>",
      });
    });
    assert.deepEqual(updates, [{ id: "c9", content: "<p>edited</p>" }]);
    assert.deepEqual(calls, []);
  });

  it("retries only the unconfirmed delete without repeating create, update or uploads", async () => {
    const deleted: string[] = [];
    let failSecond = true;
    const uploaded = mockUpload();
    mock.method(
      HomeworkCommentFileService,
      "deleteFile",
      (_commentId: string, fileId: string) => {
        deleted.push(fileId);
        return fileId === "8" && failSecond
          ? Promise.reject(deleteFailure("forbidden", 403))
          : confirmedDelete();
      }
    );
    const { result, calls } = setup();
    const original = attachmentDraft();
    await expectSyncError(() => result.current.submit(original));
    failSecond = false;
    await act(async () => {
      assert.equal(
        (await result.current.submit(original)).commentId,
        "comment-hw1"
      );
    });
    assert.deepEqual(deleted, ["7", "8", "8"]);
    assert.equal(uploaded.mock.calls.length, 1);
    assert.deepEqual(
      calls.map((call) => call.operationName),
      ["sendComment", "updateComment"]
    );
  });

  for (const status of [401, 403, undefined]) {
    it(`preserves the draft and receipt across repeated ${
      status ?? "network"
    } delete failures`, async () => {
      const deleted: string[] = [];
      let failing = true;
      const uploaded = mockUpload();
      mock.method(
        HomeworkCommentFileService,
        "deleteFile",
        (_commentId: string, fileId: string) => {
          deleted.push(fileId);
          return fileId === "8" && failing
            ? Promise.reject(deleteFailure("synthetic delete failure", status))
            : confirmedDelete();
        }
      );
      const { result, calls } = setup();
      const original = {
        ...attachmentDraft(),
        commentId: "c1",
        sentHtml: "<p>original feedback</p>",
      };
      const first = await expectSyncError(() =>
        result.current.submit(original)
      );
      const second = await expectSyncError(() =>
        result.current.submit(original)
      );
      assert.deepEqual(deleted, ["7", "8", "8"]);
      for (const receipt of [first, second]) {
        assert.equal(receipt.commentId, "c1");
        assert.deepEqual(receipt.confirmedDeletedFileIds, ["7"]);
        assert.equal(receipt.uploadedFiles.length, 1);
        assert.match(receipt.sentHtml, /\/homework\/comment\/c1\/file\/42/);
      }
      assert.equal(original.editor.getHTML(), "<p>feedback</p>");
      assert.equal(original.pendingFiles.length, 1);
      assert.deepEqual(original.attachments, [
        { href: "blob:notes", fileName: "notes.txt" },
      ]);
      assert.deepEqual(original.deletedFileIds, ["7", "8"]);
      assert.deepEqual(original.uploadedFiles, []);
      assert.deepEqual(original.confirmedDeletedFileIds, []);
      assert.equal(uploaded.mock.calls.length, 1);
      assert.deepEqual(
        calls.map((call) => call.operationName),
        ["updateComment"]
      );

      failing = false;
      await act(async () => {
        assert.equal((await result.current.submit(original)).commentId, "c1");
      });
      assert.deepEqual(deleted, ["7", "8", "8", "8"]);
      assert.equal(uploaded.mock.calls.length, 1);
      assert.equal(calls.length, 1);
    });
  }

  for (const missing of ["wrong comment/file pair", "missing comment"]) {
    it(`does not treat a 404 for a ${missing} as a confirmed delete`, async () => {
      const rejected = mock.method(
        HomeworkCommentFileService,
        "deleteFile",
        () => Promise.reject(deleteFailure(missing, 404))
      );
      const { result, calls } = setup();
      const original = {
        ...draft(),
        commentId: "c1",
        sentHtml: "<p>feedback</p>",
        deletedFileIds: ["9"],
      };
      const first = await expectSyncError(() =>
        result.current.submit(original)
      );
      const second = await expectSyncError(() =>
        result.current.submit(original)
      );
      assert.equal(first.commentId, "c1");
      assert.equal(second.commentId, "c1");
      assert.deepEqual(second.confirmedDeletedFileIds, []);
      assert.equal(rejected.mock.calls.length, 2);
      assert.equal(original.editor.getHTML(), "<p>feedback</p>");
      assert.deepEqual(original.deletedFileIds, ["9"]);
      assert.deepEqual(calls, []);
    });
  }

  for (const body of [undefined, "", null]) {
    it(`confirms DELETE 200 with an empty ${String(body)} body`, async () => {
      mock.method(HomeworkCommentFileService, "deleteFile", () =>
        confirmedDelete(body)
      );
      const deletion = renderHook(() => useHomeworkCommentFileDelete());
      await act(async () => {
        assert.notEqual(
          await deletion.result.current.deleteHomeworkCommentFile("c1", "9"),
          null
        );
      });
      assert.equal(deletion.result.current.deleting, false);
      assert.equal(deletion.result.current.error, null);
      const { result } = setup();
      await act(async () => {
        assert.equal(
          (
            await result.current.submit({
              ...draft(),
              commentId: "c1",
              sentHtml: "<p>feedback</p>",
              deletedFileIds: ["9"],
            })
          ).commentId,
          "c1"
        );
      });
    });
  }

  it("keeps an applied DELETE with a lost response unconfirmed after an ambiguous retry 404", async () => {
    const files = new Set(["7", "8"]);
    const deleted: string[] = [];
    mock.method(
      HomeworkCommentFileService,
      "deleteFile",
      (_commentId: string, fileId: string) => {
        deleted.push(fileId);
        if (!files.has(fileId)) {
          return Promise.reject(
            deleteFailure("comment/file pair not found", 404)
          );
        }
        files.delete(fileId);
        return fileId === "8"
          ? Promise.reject(deleteFailure("response lost after delete"))
          : confirmedDelete();
      }
    );
    const { result, calls } = setup();
    const original = {
      ...draft(),
      commentId: "c1",
      sentHtml: "<p>feedback</p>",
      deletedFileIds: ["7", "8"],
    };
    const first = await expectSyncError(() => result.current.submit(original));
    assert.equal(files.size, 0);
    const second = await expectSyncError(() => result.current.submit(original));
    assert.deepEqual(first.confirmedDeletedFileIds, ["7"]);
    assert.deepEqual(second.confirmedDeletedFileIds, ["7"]);
    assert.deepEqual(deleted, ["7", "8", "8"]);
    assert.equal(original.editor.getHTML(), "<p>feedback</p>");
    assert.deepEqual(original.deletedFileIds, ["7", "8"]);
    assert.deepEqual(calls, []);
  });

  it("recovers an uncertain DELETE only after a retry returns a confirmed 200", async () => {
    const files = new Set(["7", "8"]);
    const deleted: string[] = [];
    let failing = true;
    mock.method(
      HomeworkCommentFileService,
      "deleteFile",
      (_commentId: string, fileId: string) => {
        deleted.push(fileId);
        if (fileId === "8" && failing) {
          failing = false;
          return Promise.reject(deleteFailure("request lost before delete"));
        }
        assert.equal(files.delete(fileId), true);
        return confirmedDelete();
      }
    );
    const { result, calls } = setup();
    const original = {
      ...draft(),
      commentId: "c1",
      sentHtml: "<p>feedback</p>",
      deletedFileIds: ["7", "8"],
    };
    await expectSyncError(() => result.current.submit(original));
    assert.deepEqual([...files], ["8"]);
    await act(async () => {
      assert.equal((await result.current.submit(original)).commentId, "c1");
    });
    assert.equal(files.size, 0);
    assert.deepEqual(deleted, ["7", "8", "8"]);
    assert.deepEqual(calls, []);
  });

  for (const changed of ["scope", "commentId"]) {
    it(`does not transfer confirmed deletes to a different ${changed}`, async () => {
      const deleted: string[] = [];
      let failing = true;
      mock.method(
        HomeworkCommentFileService,
        "deleteFile",
        (commentId: string, fileId: string) => {
          deleted.push(`${commentId}/${fileId}`);
          return fileId === "8" && failing
            ? Promise.reject(deleteFailure("forbidden", 403))
            : confirmedDelete();
        }
      );
      const options = { scope: "scope-1" };
      const { result, rerender } = setup({}, options);
      const original = {
        ...draft(),
        commentId: "c1",
        sentHtml: "<p>feedback</p>",
        deletedFileIds: ["7", "8"],
      };
      await expectSyncError(() => result.current.submit(original));
      if (changed === "scope") {
        options.scope = "scope-2";
        rerender({ homeworkId: "hw1" });
      }
      const nextCommentId = changed === "commentId" ? "c2" : "c1";
      failing = false;
      await act(async () => {
        await result.current.submit({ ...original, commentId: nextCommentId });
      });
      assert.deepEqual(deleted, [
        "c1/7",
        "c1/8",
        `${nextCommentId}/7`,
        `${nextCommentId}/8`,
      ]);
    });
  }

  it("does not claim a receipt when the create response is unconfirmed", async () => {
    const options = { failSend: true };
    const { result, calls } = setup(options);
    await act(async () => {
      await assert.rejects(result.current.submit(draft()), /unconfirmed/);
    });
    options.failSend = false;
    await act(async () => {
      await result.current.submit(draft());
    });
    assert.deepEqual(
      calls.map((call) => call.operationName),
      ["sendComment", "sendComment"]
    );
  });
});
