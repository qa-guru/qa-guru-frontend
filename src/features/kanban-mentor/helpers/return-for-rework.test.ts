import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

import { runReturnForRework } from "./return-for-rework";

const NOT_APPROVED = StudentHomeWorkStatus.NotApproved;
const IN_REVIEW = StudentHomeWorkStatus.InReview;

const deps = (overrides: Record<string, unknown> = {}) => ({
  submitComment: () => Promise.resolve("comment-1"),
  notApproved: () => Promise.resolve({ id: "hw1" }),
  fetchStatus: () => Promise.resolve(IN_REVIEW),
  expectedStatus: NOT_APPROVED,
  ...overrides,
});

describe("runReturnForRework", () => {
  it("saves the comment first and only then returns the homework", async () => {
    const calls: string[] = [];

    const outcome = await runReturnForRework(
      { homeworkId: "hw1", commentId: null },
      deps({
        submitComment: () => {
          calls.push("sendComment");
          return Promise.resolve("comment-9");
        },
        notApproved: () => {
          calls.push("notApproved");
          return Promise.resolve({ id: "hw1" });
        },
      })
    );

    assert.deepEqual(calls, ["sendComment", "notApproved"]);
    assert.equal(outcome.kind, "done");
    assert.equal(outcome.commentId, "comment-9");
    assert.equal(outcome.status, NOT_APPROVED);
  });

  it("does not call notApproved when the comment is not confirmed", async () => {
    const calls: string[] = [];

    const outcome = await runReturnForRework(
      { homeworkId: "hw1", commentId: null },
      deps({
        submitComment: () => {
          calls.push("sendComment");
          return Promise.reject(new Error("graph down"));
        },
        notApproved: () => {
          calls.push("notApproved");
          return Promise.resolve({ id: "hw1" });
        },
      })
    );

    assert.deepEqual(calls, ["sendComment"]);
    assert.equal(outcome.kind, "comment-failed");
    assert.equal(outcome.commentId, null);
  });

  it("reports a partial result when the comment is saved but the status fails", async () => {
    const calls: string[] = [];

    const outcome = await runReturnForRework(
      { homeworkId: "hw1", commentId: null },
      deps({
        submitComment: () => {
          calls.push("sendComment");
          return Promise.resolve("comment-7");
        },
        notApproved: () => {
          calls.push("notApproved");
          return Promise.reject(new Error("status failed"));
        },
        fetchStatus: () => {
          calls.push("fetchStatus");
          return Promise.resolve(IN_REVIEW);
        },
      })
    );

    assert.deepEqual(calls, ["sendComment", "notApproved", "fetchStatus"]);
    assert.equal(outcome.kind, "status-failed");
    assert.equal(outcome.commentId, "comment-7");
    assert.equal(outcome.status, IN_REVIEW);
  });

  it("treats a lost notApproved response as done when backend already applied it", async () => {
    const outcome = await runReturnForRework(
      { homeworkId: "hw1", commentId: null },
      deps({
        notApproved: () => Promise.reject(new Error("network lost")),
        fetchStatus: () => Promise.resolve(NOT_APPROVED),
      })
    );

    assert.equal(outcome.kind, "done");
    assert.equal(outcome.commentId, "comment-1");
    assert.equal(outcome.status, NOT_APPROVED);
  });

  it("keeps the partial result when the status re-check itself fails", async () => {
    const outcome = await runReturnForRework(
      { homeworkId: "hw1", commentId: null },
      deps({
        notApproved: () => Promise.reject(new Error("status failed")),
        fetchStatus: () => Promise.reject(new Error("read failed too")),
      })
    );

    assert.equal(outcome.kind, "status-failed");
    assert.equal(outcome.status, null);
  });

  it("skips sendComment on retry when a confirmed commentId receipt exists", async () => {
    const calls: string[] = [];

    const outcome = await runReturnForRework(
      { homeworkId: "hw1", commentId: "comment-7" },
      deps({
        submitComment: () => {
          calls.push("sendComment");
          return Promise.resolve("comment-new");
        },
        notApproved: () => {
          calls.push("notApproved");
          return Promise.resolve({ id: "hw1" });
        },
      })
    );

    assert.deepEqual(calls, ["notApproved"]);
    assert.equal(outcome.kind, "done");
    assert.equal(outcome.commentId, "comment-7");
  });
});
