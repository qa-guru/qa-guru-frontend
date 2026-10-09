import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  CommentContentSyncError,
  EmptyCommentError,
  submitHomeworkComment,
} from "./submit-homework-comment";

const fakeEditor = (html: string) =>
  ({
    getHTML: () => html,
    state: { doc: { descendants: () => true } },
    commands: { clearContent: () => {} },
  } as never);

const makeDeps = (overrides: Record<string, unknown> = {}) => ({
  sendComment: ({ variables }: { variables: { content: string } }) =>
    Promise.resolve({
      data: {
        sendComment: { __typename: "CommentHomeWorkDto", id: "c1" },
      },
      variablesUsed: variables,
    }),
  updateComment: () => Promise.resolve({}),
  uploadFile: () => Promise.resolve({ id: "42" }),
  deleteFile: () => Promise.resolve({}),
  commentFileGetUri: "/homework/comment/:commentId/file/:fileId",
  ...overrides,
});

const input = (html: string, overrides: Record<string, unknown> = {}) => ({
  homeworkId: "hw1",
  editor: fakeEditor(html),
  pendingFiles: [],
  deletedFileIds: [],
  ...overrides,
});

describe("submitHomeworkComment", () => {
  it("rejects an empty comment without touching mutations", async () => {
    let called = 0;
    const deps = makeDeps({
      sendComment: () => {
        called += 1;
        return Promise.resolve({ data: { sendComment: { id: "c1" } } });
      },
    });

    for (const html of ["", "   ", "<p></p>"]) {
      await assert.rejects(
        () => submitHomeworkComment(deps as never, input(html) as never),
        EmptyCommentError
      );
    }
    assert.equal(called, 0);
  });

  it("saves the comment and returns its id without an extra updateComment", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const deps = makeDeps({
      sendComment: (options: {
        variables: { homeWorkId: string; content: string };
      }) => {
        calls.push({ op: "sendComment", ...options.variables });
        return Promise.resolve({ data: { sendComment: { id: "c9" } } });
      },
      updateComment: (options: {
        variables: { id: string; content: string };
      }) => {
        calls.push({ op: "updateComment", ...options.variables });
        return Promise.resolve({});
      },
    });

    const result = await submitHomeworkComment(
      deps as never,
      input("<p>fix tests</p>") as never
    );

    assert.equal(result.commentId, "c9");
    assert.deepEqual(calls, [
      { op: "sendComment", homeWorkId: "hw1", content: "<p>fix tests</p>" },
    ]);
  });

  it("fails when the server does not confirm the comment", async () => {
    let updated = 0;
    const deps = makeDeps({
      sendComment: () => Promise.resolve({ data: { sendComment: null } }),
      updateComment: () => {
        updated += 1;
        return Promise.resolve({});
      },
    });

    await assert.rejects(() =>
      submitHomeworkComment(deps as never, input("<p>x</p>") as never)
    );
    assert.equal(updated, 0);
  });

  it("keeps the commentId receipt when the post-save sync fails", async () => {
    const file = new File(["data"], "shot.png", { type: "image/png" });
    const deps = makeDeps({
      updateComment: () => Promise.reject(new Error("update failed")),
    });

    const error = await submitHomeworkComment(
      deps as never,
      input('<p><img src="blob:local-1"/></p>', {
        pendingFiles: [{ file, localUrl: "blob:local-1" }],
      }) as never
    ).then(
      () => {
        throw new Error("should have thrown");
      },
      (e) => e
    );

    assert.ok(error instanceof CommentContentSyncError);
    assert.equal(error.commentId, "c1");
  });

  it("resumes the sync for a saved comment without a new sendComment", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const file = new File(["data"], "shot.png", { type: "image/png" });
    const deps = makeDeps({
      sendComment: () => {
        calls.push({ op: "sendComment" });
        return Promise.resolve({ data: { sendComment: { id: "other" } } });
      },
      uploadFile: (f: File, commentId: string) => {
        calls.push({ op: "upload", name: f.name, commentId });
        return Promise.resolve({ id: "42" });
      },
      updateComment: (options: {
        variables: { id: string; content: string };
      }) => {
        calls.push({ op: "updateComment", ...options.variables });
        return Promise.resolve({});
      },
    });

    const result = await submitHomeworkComment(
      deps as never,
      input('<p><img src="blob:local-1"/></p>', {
        commentId: "c1",
        pendingFiles: [{ file, localUrl: "blob:local-1" }],
      }) as never
    );

    assert.equal(result.commentId, "c1");
    assert.deepEqual(calls, [
      { op: "upload", name: "shot.png", commentId: "c1" },
      {
        op: "updateComment",
        id: "c1",
        content: '<p><img src="/homework/comment/c1/file/42"/></p>',
      },
    ]);
  });

  it("resolves a saved unchanged comment without any sync calls", async () => {
    const calls: string[] = [];
    const deps = makeDeps({
      sendComment: () => {
        calls.push("sendComment");
        return Promise.resolve({ data: { sendComment: { id: "other" } } });
      },
      updateComment: () => {
        calls.push("updateComment");
        return Promise.resolve({});
      },
      deleteFile: () => {
        calls.push("deleteFile");
        return Promise.resolve({});
      },
    });

    const result = await submitHomeworkComment(
      deps as never,
      input("<p>x</p>", { commentId: "c7", sentHtml: "<p>x</p>" }) as never
    );

    assert.equal(result.commentId, "c7");
    assert.deepEqual(calls, []);
  });

  it("updates a saved comment when the text changed before retry", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const deps = makeDeps({
      sendComment: () => {
        calls.push({ op: "sendComment" });
        return Promise.resolve({ data: { sendComment: { id: "other" } } });
      },
      updateComment: (options: {
        variables: { id: string; content: string };
      }) => {
        calls.push({ op: "updateComment", ...options.variables });
        return Promise.resolve({});
      },
    });

    const result = await submitHomeworkComment(
      deps as never,
      input("<p>edited text</p>", {
        commentId: "c7",
        sentHtml: "<p>original</p>",
      }) as never
    );

    assert.equal(result.commentId, "c7");
    assert.deepEqual(calls, [
      { op: "updateComment", id: "c7", content: "<p>edited text</p>" },
    ]);
  });

  it("uploads pending files and rewrites blob urls before updating", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const file = new File(["data"], "shot.png", { type: "image/png" });
    const deps = makeDeps({
      uploadFile: (f: File, commentId: string) => {
        calls.push({ op: "upload", name: f.name, commentId });
        return Promise.resolve({ id: "42" });
      },
      updateComment: (options: {
        variables: { id: string; content: string };
      }) => {
        calls.push({ op: "updateComment", ...options.variables });
        return Promise.resolve({});
      },
    });

    const html = '<p><img src="blob:local-1"/></p>';
    const result = await submitHomeworkComment(
      deps as never,
      input(html, {
        pendingFiles: [{ file, localUrl: "blob:local-1" }],
      }) as never
    );

    assert.equal(result.commentId, "c1");
    assert.deepEqual(calls, [
      { op: "upload", name: "shot.png", commentId: "c1" },
      {
        op: "updateComment",
        id: "c1",
        content: '<p><img src="/homework/comment/c1/file/42"/></p>',
      },
    ]);
  });

  it("reuses a confirmed upload after updateComment fails", async () => {
    const calls: string[] = [];
    const file = new File(["data"], "notes.txt", { type: "text/plain" });
    let updates = 0;
    const deps = makeDeps({
      sendComment: () => {
        calls.push("sendComment");
        return Promise.resolve({ data: { sendComment: { id: "c1" } } });
      },
      uploadFile: () => {
        calls.push("upload");
        return Promise.resolve({ id: "42" });
      },
      updateComment: () => {
        calls.push("updateComment");
        updates += 1;
        return updates === 1
          ? Promise.reject(new Error("sync failed"))
          : Promise.resolve({});
      },
    });
    const draft = input(
      '<p>feedback <file-node href="blob:local-1"></file-node></p>',
      {
        pendingFiles: [{ file, localUrl: "blob:local-1" }],
      }
    );
    const error = await submitHomeworkComment(
      deps as never,
      draft as never
    ).catch((error: unknown) => error);
    assert.ok(error instanceof CommentContentSyncError);
    assert.deepEqual(error.uploadedFiles, [
      {
        localUrl: "blob:local-1",
        fileId: "42",
        realUrl: "/homework/comment/c1/file/42",
      },
    ]);

    await submitHomeworkComment(
      deps as never,
      {
        ...draft,
        commentId: error.commentId,
        sentHtml: error.sentHtml,
        uploadedFiles: error.uploadedFiles,
      } as never
    );

    assert.deepEqual(calls, [
      "sendComment",
      "upload",
      "updateComment",
      "updateComment",
    ]);
  });

  it("keeps successful parallel uploads when another upload fails", async () => {
    const uploads: string[] = [];
    let failSecond = true;
    const deps = makeDeps({
      uploadFile: async (file: File) => {
        uploads.push(file.name);
        if (file.name === "second.txt" && failSecond) {
          throw new Error("second upload failed");
        }
        await new Promise((resolve) => setTimeout(resolve, 20));
        return { id: file.name === "first.txt" ? "41" : "42" };
      },
    });
    const draft = input(
      '<p><file-node href="blob:first"></file-node><file-node href="blob:second"></file-node></p>',
      {
        pendingFiles: [
          { file: new File(["first"], "first.txt"), localUrl: "blob:first" },
          { file: new File(["second"], "second.txt"), localUrl: "blob:second" },
        ],
      }
    );
    const error = await submitHomeworkComment(
      deps as never,
      draft as never
    ).catch((error: unknown) => error);
    assert.ok(error instanceof CommentContentSyncError);
    assert.equal(error.uploadedFiles.length, 1);
    assert.equal(error.uploadedFiles[0].fileId, "41");

    failSecond = false;
    await submitHomeworkComment(
      deps as never,
      {
        ...draft,
        commentId: error.commentId,
        sentHtml: error.sentHtml,
        uploadedFiles: error.uploadedFiles,
      } as never
    );
    assert.deepEqual(uploads, ["first.txt", "second.txt", "second.txt"]);
  });

  it("rejects an upload without a confirmed file id before updating content", async () => {
    let updated = 0;
    const updateComment = () => {
      updated += 1;
      return Promise.resolve({});
    };
    for (const uploaded of [
      null,
      {},
      { id: null },
      { id: "" },
      { id: "   " },
    ]) {
      const deps = makeDeps({
        uploadFile: () => Promise.resolve(uploaded),
        updateComment,
      });
      await assert.rejects(
        () =>
          submitHomeworkComment(
            deps as never,
            input('<p><img src="blob:local-1"/></p>', {
              pendingFiles: [
                {
                  file: new File(["x"], "notes.txt"),
                  localUrl: "blob:local-1",
                },
              ],
            }) as never
          ),
        CommentContentSyncError
      );
    }
    assert.equal(updated, 0);
  });

  it("does not recover or upload a blob with a confirmed upload receipt", async () => {
    const realFetch = globalThis.fetch;
    let fetches = 0;
    let uploads = 0;
    globalThis.fetch = (() => {
      fetches += 1;
      return Promise.reject(new Error("blob should not be fetched"));
    }) as never;
    try {
      await submitHomeworkComment(
        makeDeps({
          uploadFile: () => {
            uploads += 1;
            return Promise.resolve({ id: "other" });
          },
        }) as never,
        input('<p><img src="blob:local-1"/></p>', {
          commentId: "c1",
          uploadedFiles: [
            {
              localUrl: "blob:local-1",
              fileId: "42",
              realUrl: "/homework/comment/c1/file/42",
            },
          ],
        }) as never
      );
      assert.equal(fetches, 0);
      assert.equal(uploads, 0);
    } finally {
      globalThis.fetch = realFetch;
    }
  });

  it("does not upload a pending file removed from the current draft", async () => {
    let uploads = 0;
    await submitHomeworkComment(
      makeDeps({
        uploadFile: () => {
          uploads += 1;
          return Promise.resolve({ id: "42" });
        },
      }) as never,
      input("<p>feedback without the file</p>", {
        pendingFiles: [
          { file: new File(["x"], "removed.txt"), localUrl: "blob:removed" },
        ],
      }) as never
    );
    assert.equal(uploads, 0);
  });

  it("uploads external attachments without putting them in the editor document", async () => {
    const calls: Array<{ op: string; content?: string }> = [];
    const html = "<p>feedback</p>";
    const deps = makeDeps({
      sendComment: ({ variables }: { variables: { content: string } }) => {
        calls.push({ op: "sendComment", content: variables.content });
        return Promise.resolve({ data: { sendComment: { id: "c1" } } });
      },
      uploadFile: () => {
        calls.push({ op: "upload" });
        return Promise.resolve({ id: "42" });
      },
      updateComment: ({ variables }: { variables: { content: string } }) => {
        calls.push({ op: "updateComment", content: variables.content });
        return Promise.resolve({});
      },
    });
    const draft = input(html, {
      pendingFiles: [
        { file: new File(["data"], "notes.txt"), localUrl: "blob:external" },
      ],
      attachments: [{ href: "blob:external", fileName: "notes.txt", size: 4 }],
    });
    await submitHomeworkComment(deps as never, draft as never);
    assert.deepEqual(
      calls.map((call) => call.op),
      ["sendComment", "upload", "updateComment"]
    );
    assert.match(calls[0].content!, /^<p>feedback<\/p><p><file-node /);
    assert.match(calls[2].content!, /href="\/homework\/comment\/c1\/file\/42"/);
    assert.match(calls[2].content!, /data-file-size="4"/);
    assert.equal(draft.editor.getHTML(), html);
  });

  it("keeps external uploads in the receipt when content sync fails", async () => {
    const calls: string[] = [];
    let updates = 0;
    const deps = makeDeps({
      sendComment: () => {
        calls.push("sendComment");
        return Promise.resolve({ data: { sendComment: { id: "c1" } } });
      },
      uploadFile: () => {
        calls.push("upload");
        return Promise.resolve({ id: "42" });
      },
      updateComment: () => {
        calls.push("updateComment");
        updates += 1;
        return updates === 1
          ? Promise.reject(new Error("sync failed"))
          : Promise.resolve({});
      },
    });
    const draft = input("<p>feedback</p>", {
      pendingFiles: [
        { file: new File(["data"], "notes.txt"), localUrl: "blob:external" },
      ],
      attachments: [{ href: "blob:external", fileName: "notes.txt", size: 4 }],
    });
    const error = await submitHomeworkComment(
      deps as never,
      draft as never
    ).catch((error: unknown) => error);
    assert.ok(error instanceof CommentContentSyncError);
    assert.equal(error.uploadedFiles[0].fileId, "42");
    await submitHomeworkComment(
      deps as never,
      {
        ...draft,
        commentId: error.commentId,
        sentHtml: error.sentHtml,
        uploadedFiles: error.uploadedFiles,
      } as never
    );
    assert.deepEqual(calls, [
      "sendComment",
      "upload",
      "updateComment",
      "updateComment",
    ]);
  });

  it("uploads inline images and external files in the same comment", async () => {
    const uploads: string[] = [];
    let saved = "";
    const deps = makeDeps({
      uploadFile: (file: File) => {
        uploads.push(file.name);
        return Promise.resolve({ id: file.name === "notes.txt" ? "42" : "43" });
      },
      updateComment: ({ variables }: { variables: { content: string } }) => {
        saved = variables.content;
        return Promise.resolve({});
      },
    });
    await submitHomeworkComment(
      deps as never,
      input('<p>feedback <img src="blob:image"/></p>', {
        attachments: [{ href: "blob:external", fileName: "notes.txt" }],
        pendingFiles: [
          { file: new File(["image"], "shot.png"), localUrl: "blob:image" },
          { file: new File(["data"], "notes.txt"), localUrl: "blob:external" },
        ],
      }) as never
    );
    assert.deepEqual(uploads.sort(), ["notes.txt", "shot.png"]);
    assert.match(saved, /<img src="\/homework\/comment\/c1\/file\/43"/);
    assert.match(
      saved,
      /<\/p><p><file-node href="\/homework\/comment\/c1\/file\/42"/
    );
  });

  it("does not upload an external attachment removed from the list", async () => {
    let uploads = 0;
    let sent = "";
    await submitHomeworkComment(
      makeDeps({
        sendComment: ({ variables }: { variables: { content: string } }) => {
          sent = variables.content;
          return Promise.resolve({ data: { sendComment: { id: "c1" } } });
        },
        uploadFile: () => {
          uploads += 1;
          return Promise.resolve({ id: "42" });
        },
      }) as never,
      input(
        '<p>feedback<file-node href="blob:removed" fileName="removed.txt"></file-node></p>',
        {
          attachments: [],
          pendingFiles: [
            {
              file: new File(["data"], "removed.txt"),
              localUrl: "blob:removed",
            },
          ],
        }
      ) as never
    );
    assert.equal(uploads, 0);
    assert.equal(sent, "<p>feedback</p>");
  });

  it("does not delete a saved attachment still present outside the editor", async () => {
    let deletes = 0;
    await submitHomeworkComment(
      makeDeps({
        deleteFile: () => {
          deletes += 1;
          return Promise.resolve({});
        },
      }) as never,
      input("<p>feedback</p>", {
        commentId: "c1",
        attachments: [
          { href: "/homework/comment/c1/file/42", fileName: "notes.txt" },
        ],
        deletedFileIds: ["42"],
      }) as never
    );
    assert.equal(deletes, 0);
  });

  it("preserves attachment-only comments without requiring a fake editor node", async () => {
    const result = await submitHomeworkComment(
      makeDeps() as never,
      input("<p></p>", {
        attachments: [{ href: "blob:external", fileName: "notes.txt" }],
        pendingFiles: [
          { file: new File(["data"], "notes.txt"), localUrl: "blob:external" },
        ],
      }) as never
    );
    assert.equal(result.commentId, "c1");
  });

  it("deletes files that were removed while editing", async () => {
    const calls: Array<Record<string, unknown>> = [];
    const deps = makeDeps({
      deleteFile: (commentId: string, fileId: string) => {
        calls.push({ op: "delete", commentId, fileId });
        return Promise.resolve({});
      },
    });

    await submitHomeworkComment(
      deps as never,
      input("<p>x</p>", { deletedFileIds: ["7", "8"] }) as never
    );

    assert.deepEqual(calls, [
      { op: "delete", commentId: "c1", fileId: "7" },
      { op: "delete", commentId: "c1", fileId: "8" },
    ]);
  });

  it("fails the submit when a comment file delete is not confirmed", async () => {
    const deps = makeDeps({
      deleteFile: () => Promise.resolve(null),
    });

    const error = await submitHomeworkComment(
      deps as never,
      input("<p>x</p>", { deletedFileIds: ["7"] }) as never
    ).then(
      () => {
        throw new Error("should have thrown");
      },
      (e) => e
    );

    assert.ok(error instanceof CommentContentSyncError);
    assert.equal(error.commentId, "c1");
  });

  for (const failure of ["null", "rejection"]) {
    it(`receipts confirmed deletions before a later ${failure} and retries only the remainder`, async () => {
      const calls: string[] = [];
      let failSecond = true;
      const deleteError = new Error("second delete failed");
      const deps = makeDeps({
        sendComment: () => {
          calls.push("sendComment");
          return Promise.resolve({ data: { sendComment: { id: "c1" } } });
        },
        uploadFile: () => {
          calls.push("upload");
          return Promise.resolve({ id: "42" });
        },
        updateComment: () => {
          calls.push("updateComment");
          return Promise.resolve({});
        },
        deleteFile: (_commentId: string, fileId: string) => {
          calls.push(`delete:${fileId}`);
          if (fileId === "8" && failSecond) {
            return failure === "null"
              ? Promise.resolve(null)
              : Promise.reject(deleteError);
          }
          return Promise.resolve(undefined);
        },
      });
      const original = input("<p>feedback</p>", {
        pendingFiles: [
          { file: new File(["data"], "notes.txt"), localUrl: "blob:notes" },
        ],
        attachments: [{ href: "blob:notes", fileName: "notes.txt" }],
        deletedFileIds: ["7", "8"],
      });
      const error = await submitHomeworkComment(
        deps as never,
        original as never
      ).catch((error: unknown) => error);
      assert.ok(error instanceof CommentContentSyncError);
      assert.deepEqual(error.confirmedDeletedFileIds, ["7"]);
      assert.equal(error.uploadedFiles.length, 1);
      assert.match(error.sentHtml, /\/homework\/comment\/c1\/file\/42/);
      if (failure === "rejection") assert.equal(error.cause, deleteError);

      failSecond = false;
      assert.deepEqual(
        await submitHomeworkComment(
          deps as never,
          {
            ...original,
            commentId: error.commentId,
            sentHtml: error.sentHtml,
            uploadedFiles: error.uploadedFiles,
            confirmedDeletedFileIds: error.confirmedDeletedFileIds,
          } as never
        ),
        { commentId: "c1" }
      );
      assert.deepEqual(calls, [
        "sendComment",
        "upload",
        "updateComment",
        "delete:7",
        "delete:8",
        "delete:8",
      ]);
      assert.deepEqual(original.deletedFileIds, ["7", "8"]);
      assert.deepEqual(error.confirmedDeletedFileIds, ["7"]);
    });
  }

  it("does not repeat a confirmed delete listed twice in the same draft", async () => {
    const deleted: string[] = [];
    await submitHomeworkComment(
      makeDeps({
        deleteFile: (_commentId: string, fileId: string) => {
          deleted.push(fileId);
          return Promise.resolve(undefined);
        },
      }) as never,
      input("<p>feedback</p>", { deletedFileIds: ["7", "7", "8"] }) as never
    );
    assert.deepEqual(deleted, ["7", "8"]);
  });

  it("retries an unconfirmed delete without repeating the comment create", async () => {
    const calls: Array<Record<string, unknown>> = [];
    let failDelete = true;
    const deps = makeDeps({
      sendComment: ({ variables }: { variables: { content: string } }) => {
        calls.push({ op: "sendComment", content: variables.content });
        return Promise.resolve({ data: { sendComment: { id: "c1" } } });
      },
      deleteFile: (commentId: string, fileId: string) => {
        calls.push({ op: "delete", commentId, fileId });
        return Promise.resolve(failDelete ? null : {});
      },
    });
    const draft = input("<p>x</p>", { deletedFileIds: ["7"] });

    await assert.rejects(
      () => submitHomeworkComment(deps as never, draft as never),
      CommentContentSyncError
    );
    failDelete = false;
    await submitHomeworkComment(
      deps as never,
      { ...draft, commentId: "c1", sentHtml: "<p>x</p>" } as never
    );

    assert.deepEqual(calls, [
      { op: "sendComment", content: "<p>x</p>" },
      { op: "delete", commentId: "c1", fileId: "7" },
      { op: "delete", commentId: "c1", fileId: "7" },
    ]);
  });

  it("propagates a sendComment failure without touching later steps", async () => {
    let updated = 0;
    const deps = makeDeps({
      sendComment: () => Promise.reject(new Error("boom")),
      updateComment: () => {
        updated += 1;
        return Promise.resolve({});
      },
    });

    await assert.rejects(
      () => submitHomeworkComment(deps as never, input("<p>x</p>") as never),
      /boom/
    );
    assert.equal(updated, 0);
  });
});
