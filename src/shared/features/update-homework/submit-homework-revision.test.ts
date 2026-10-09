import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

import {
  HomeworkRevisionDeps,
  HomeworkRevisionError,
  HomeworkRevisionInput,
  HomeworkRevisionReceipt,
  submitHomeworkRevision,
} from "./submit-homework-revision";

const setup = () => {
  const calls: Array<{ operation: string; id: string; content?: string }> = [];
  const options = {
    saveFailures: 0,
    submitFailures: 0,
    uploadFailure: "",
    deleteFailures: 0,
    unconfirmedSave: false,
    unconfirmedUpload: false,
    responseId: "hw1",
    responseStatus: StudentHomeWorkStatus.InReview,
    current: true,
  };
  let html = "<p>Corrected synthetic answer</p>";
  const receipt: HomeworkRevisionReceipt = {
    homeworkId: "hw1",
    uploadedFiles: [],
    deletedFileIds: [],
  };
  const dto = (id: string, answer: string, status: StudentHomeWorkStatus) => ({
    id,
    answer,
    status,
    updateDate: "2026-10-04T12:00:00",
  });
  const deps: HomeworkRevisionDeps = {
    updateHomework: (({
      variables,
    }: {
      variables: { id: string; content: string };
    }) => {
      calls.push({ operation: "save", ...variables });
      if (options.saveFailures-- > 0)
        return Promise.reject(new Error("Synthetic save failure"));
      return Promise.resolve({
        data: {
          updateHomeWork: options.unconfirmedSave
            ? null
            : dto(
                options.responseId,
                variables.content,
                StudentHomeWorkStatus.NotApproved
              ),
        },
      });
    }) as never,
    sendHomeWorkToCheck: (({
      variables,
    }: {
      variables: { homeWorkId: string };
    }) => {
      calls.push({ operation: "submit", id: variables.homeWorkId });
      if (options.submitFailures-- > 0)
        return Promise.reject(new Error("Synthetic submit failure"));
      return Promise.resolve({
        data: {
          sendHomeWorkToCheck: dto(
            options.responseId,
            receipt.saved!.html,
            options.responseStatus
          ),
        },
      });
    }) as never,
    uploadFile: (file, id) => {
      calls.push({ operation: "upload", id, content: file.name });
      if (options.uploadFailure === file.name)
        return Promise.reject(new Error("Synthetic upload failure"));
      return Promise.resolve({
        id: options.unconfirmedUpload ? null : file.name,
      });
    },
    deleteFile: (id, fileId) => {
      calls.push({ operation: "delete", id, content: fileId });
      if (options.deleteFailures-- > 0) return Promise.resolve(null);
      return Promise.resolve(undefined);
    },
    homeworkFileGetUri: "/homework/:homeWorkId/file/:fileId",
    isCurrent: () => options.current,
  };
  const input: HomeworkRevisionInput = {
    homeworkId: "hw1",
    editor: {
      getHTML: () => html,
      state: { doc: { descendants: () => true } },
    } as never,
    pendingFiles: [],
    deletedFileIds: [],
    resubmit: true,
  };
  return {
    calls,
    options,
    receipt,
    deps,
    input,
    edit: (content: string) => {
      html = content;
    },
    run: () => submitHomeworkRevision(deps, input, receipt),
    operations: () => calls.map((call) => call.operation),
  };
};

const failsAt = (stage: HomeworkRevisionError["stage"]) => (error: unknown) =>
  error instanceof HomeworkRevisionError && error.stage === stage;
const addFile = (fixture: ReturnType<typeof setup>, name = "answer.txt") => {
  fixture.input.pendingFiles.push({
    file: new File(["Synthetic answer evidence"], name),
    localUrl: `blob:${name}`,
    source: "studentHomework",
  });
  fixture.edit(
    `<p>Corrected answer <file-node href="blob:${name}" fileName="${name}"></file-node></p>`
  );
};

describe("submitHomeworkRevision", () => {
  it("saves and submits the same existing homework and preserves backend status", async () => {
    const fixture = setup();
    const result = await fixture.run();
    assert.equal(result?.status, StudentHomeWorkStatus.InReview);
    assert.equal(result?.updateDate, "2026-10-04T12:00:00");
    assert.deepEqual(fixture.operations(), ["save", "submit"]);
    assert.ok(fixture.calls.every((call) => call.id === "hw1"));
  });

  it("does not submit after a failed save and retries saving", async () => {
    const fixture = setup();
    fixture.options.saveFailures = 1;
    await assert.rejects(fixture.run(), failsAt("save"));
    assert.equal(fixture.receipt.saved, undefined);
    assert.deepEqual(fixture.operations(), ["save"]);
    await fixture.run();
    assert.deepEqual(fixture.operations(), ["save", "save", "submit"]);
  });

  it("does not submit when the save response is null", async () => {
    const fixture = setup();
    fixture.options.unconfirmedSave = true;
    await assert.rejects(fixture.run(), failsAt("save"));
    assert.deepEqual(fixture.operations(), ["save"]);
    assert.equal(fixture.receipt.saved, undefined);
  });

  it("does not accept a save receipt for another homework", async () => {
    const fixture = setup();
    fixture.options.responseId = "hw2";
    await assert.rejects(fixture.run(), failsAt("save"));
    assert.deepEqual(fixture.operations(), ["save"]);
  });

  it("requires the save response to confirm the submitted content", async () => {
    const fixture = setup();
    fixture.deps.updateHomework = (() =>
      Promise.resolve({
        data: {
          updateHomeWork: {
            id: "hw1",
            answer: "<p>Older answer</p>",
            status: StudentHomeWorkStatus.NotApproved,
          },
        },
      })) as never;
    await assert.rejects(fixture.run(), failsAt("save"));
    assert.equal(fixture.receipt.saved, undefined);
    assert.deepEqual(fixture.calls, []);
  });

  it("retries only submit when an unchanged draft was saved", async () => {
    const fixture = setup();
    fixture.options.submitFailures = 1;
    await assert.rejects(fixture.run(), failsAt("submit"));
    assert.equal(
      fixture.receipt.saved?.html,
      "<p>Corrected synthetic answer</p>"
    );
    await fixture.run();
    assert.deepEqual(fixture.operations(), ["save", "submit", "submit"]);
  });

  it("saves the new version when the draft changed after a submit failure", async () => {
    const fixture = setup();
    fixture.options.submitFailures = 1;
    await assert.rejects(fixture.run(), failsAt("submit"));
    fixture.edit("<p>Second corrected answer</p>");
    await fixture.run();
    assert.deepEqual(fixture.operations(), [
      "save",
      "submit",
      "save",
      "submit",
    ]);
    assert.equal(fixture.receipt.saved?.html, "<p>Second corrected answer</p>");
  });

  it("keeps confirmed uploads across a failed save without recovering the blob again", async () => {
    const fixture = setup();
    addFile(fixture);
    fixture.options.saveFailures = 1;
    await assert.rejects(fixture.run(), failsAt("save"));
    fixture.input.pendingFiles = [];
    await fixture.run();
    assert.deepEqual(fixture.operations(), [
      "upload",
      "save",
      "save",
      "submit",
    ]);
    assert.equal(fixture.receipt.uploadedFiles.length, 1);
    assert.ok(
      fixture.receipt.saved?.html.includes("/homework/hw1/file/answer.txt")
    );
    assert.ok(!fixture.receipt.saved?.html.includes("/homework/comment/"));
  });

  it("keeps successful uploads when the next upload fails", async () => {
    const fixture = setup();
    addFile(fixture, "first.txt");
    addFile(fixture, "second.txt");
    fixture.edit(
      '<p><file-node href="blob:first.txt"></file-node><file-node href="blob:second.txt"></file-node></p>'
    );
    fixture.options.uploadFailure = "second.txt";
    await assert.rejects(fixture.run(), failsAt("save"));
    assert.equal(fixture.receipt.uploadedFiles.length, 1);
    fixture.options.uploadFailure = "";
    await fixture.run();
    assert.deepEqual(fixture.operations(), [
      "upload",
      "upload",
      "upload",
      "save",
      "submit",
    ]);
    assert.deepEqual(
      fixture.calls
        .filter((call) => call.operation === "upload")
        .map((call) => call.content),
      ["first.txt", "second.txt", "second.txt"]
    );
  });

  it("does not save or submit after an unconfirmed upload", async () => {
    const fixture = setup();
    addFile(fixture);
    fixture.options.unconfirmedUpload = true;
    await assert.rejects(fixture.run(), failsAt("save"));
    assert.deepEqual(fixture.operations(), ["upload"]);
    assert.equal(fixture.receipt.uploadedFiles.length, 0);
  });

  it("ignores pending files removed from the current draft", async () => {
    const fixture = setup();
    addFile(fixture);
    fixture.edit("<p>Answer without the removed file</p>");
    await fixture.run();
    assert.deepEqual(fixture.operations(), ["save", "submit"]);
  });

  it("does not upload the same blob twice when it appears more than once", async () => {
    const fixture = setup();
    addFile(fixture);
    fixture.edit(
      '<p><file-node href="blob:answer.txt"></file-node><img src="blob:answer.txt"></p>'
    );
    await fixture.run();
    assert.deepEqual(fixture.operations(), ["upload", "save", "submit"]);
    assert.ok(!fixture.receipt.saved?.html.includes("blob:"));
  });

  it("deletes only removed answer files and does not repeat confirmed deletions", async () => {
    const fixture = setup();
    fixture.input.deletedFileIds = ["student-file-1"];
    fixture.options.submitFailures = 1;
    await assert.rejects(fixture.run(), failsAt("submit"));
    await fixture.run();
    assert.deepEqual(fixture.operations(), [
      "save",
      "delete",
      "submit",
      "submit",
    ]);
    assert.deepEqual(fixture.receipt.deletedFileIds, ["student-file-1"]);
    assert.equal(fixture.calls[1].id, "hw1");
  });

  it("does not submit until file deletion is confirmed", async () => {
    const fixture = setup();
    fixture.input.deletedFileIds = ["student-file-1"];
    fixture.options.deleteFailures = 1;
    await assert.rejects(fixture.run(), failsAt("save"));
    assert.deepEqual(fixture.operations(), ["save", "delete"]);
    await fixture.run();
    assert.deepEqual(fixture.operations(), [
      "save",
      "delete",
      "delete",
      "submit",
    ]);
  });

  it("rejects empty content without making requests", async () => {
    const fixture = setup();
    fixture.edit("<p></p>");
    await assert.rejects(fixture.run(), failsAt("empty"));
    assert.deepEqual(fixture.calls, []);
  });

  it("keeps save-only editing separate from explicit resubmission", async () => {
    const fixture = setup();
    fixture.input.resubmit = false;
    assert.equal(
      (await fixture.run())?.status,
      StudentHomeWorkStatus.NotApproved
    );
    assert.deepEqual(fixture.operations(), ["save"]);
  });

  it("stops before saving after a scope change during an upload", async () => {
    const fixture = setup();
    addFile(fixture);
    fixture.deps.uploadFile = () => {
      fixture.options.current = false;
      return Promise.resolve({ id: "student-file-1" });
    };
    assert.equal(await fixture.run(), null);
    assert.deepEqual(fixture.calls, []);
  });

  it("does not submit after a scope change during a save", async () => {
    const fixture = setup();
    const save = fixture.deps.updateHomework;
    fixture.deps.updateHomework = ((options: never) => {
      fixture.options.current = false;
      return save(options);
    }) as never;
    assert.equal(await fixture.run(), null);
    assert.deepEqual(fixture.operations(), ["save"]);
  });

  it("ignores a late submission result without applying it to another homework", async () => {
    const fixture = setup();
    const submit = fixture.deps.sendHomeWorkToCheck!;
    fixture.deps.sendHomeWorkToCheck = ((options: never) => {
      fixture.options.current = false;
      return submit(options);
    }) as never;
    assert.equal(await fixture.run(), null);
    assert.deepEqual(fixture.operations(), ["save", "submit"]);
  });

  it("rejects a receipt from another homework before touching any API", async () => {
    const fixture = setup();
    fixture.receipt.homeworkId = "hw2";
    await assert.rejects(fixture.run(), /another homework/);
    assert.deepEqual(fixture.calls, []);
  });

  it("does not guess REVIEW when the submission response has no status", async () => {
    const fixture = setup();
    fixture.options.responseStatus = null as never;
    await assert.rejects(fixture.run(), failsAt("submit"));
    assert.equal(
      fixture.receipt.saved?.homework.status,
      StudentHomeWorkStatus.NotApproved
    );
  });

  it("classifies a GraphQL invalid-state rejection on submit", async () => {
    const fixture = setup();
    fixture.deps.sendHomeWorkToCheck = (() =>
      Promise.reject({
        message: "Invalid homework state",
        graphQLErrors: [
          {
            message: "Invalid homework state",
            extensions: { classification: "BAD_REQUEST" },
          },
        ],
      })) as never;
    await assert.rejects(
      fixture.run(),
      (error: unknown) =>
        error instanceof HomeworkRevisionError &&
        error.stage === "submit" &&
        error.reason === "state"
    );
  });

  it("classifies a GraphQL invalid-state rejection on save", async () => {
    const fixture = setup();
    fixture.deps.updateHomework = (() =>
      Promise.reject({
        graphQLErrors: [
          {
            message: "Invalid homework state",
            extensions: { classification: "BAD_REQUEST" },
          },
        ],
      })) as never;
    await assert.rejects(
      fixture.run(),
      (error: unknown) =>
        error instanceof HomeworkRevisionError &&
        error.stage === "save" &&
        error.reason === "state"
    );
  });

  it("classifies a REST 404 upload failure as not found", async () => {
    const fixture = setup();
    addFile(fixture);
    fixture.deps.uploadFile = () =>
      Promise.reject({ response: { status: 404 } });
    await assert.rejects(
      fixture.run(),
      (error: unknown) =>
        error instanceof HomeworkRevisionError && error.reason === "notFound"
    );
  });

  it("classifies a GraphQL NOT_FOUND save rejection as not found", async () => {
    const fixture = setup();
    fixture.deps.updateHomework = (() =>
      Promise.reject({
        graphQLErrors: [
          {
            message: "Object not found",
            extensions: { classification: "NOT_FOUND" },
          },
        ],
      })) as never;
    await assert.rejects(
      fixture.run(),
      (error: unknown) =>
        error instanceof HomeworkRevisionError && error.reason === "notFound"
    );
  });

  it("keeps a plain BAD_REQUEST validation failure generic", async () => {
    const fixture = setup();
    fixture.deps.updateHomework = (() =>
      Promise.reject({
        graphQLErrors: [
          {
            message: "Content must not be empty",
            extensions: { classification: "BAD_REQUEST" },
          },
        ],
      })) as never;
    await assert.rejects(
      fixture.run(),
      (error: unknown) =>
        error instanceof HomeworkRevisionError && error.reason === undefined
    );
  });
});
