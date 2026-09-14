import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  lectureCardAttachments,
  lectureFileGetKind,
} from "./lecture-files";

const materials = {
  id: "m1",
  homeWork: false,
  fileName: "slides.pdf",
};
const homework = {
  id: "h1",
  homeWork: true,
  fileName: "task.zip",
};

describe("lectureFileGetKind", () => {
  it("uses homework GET only when homeWork is true", () => {
    assert.equal(lectureFileGetKind(true), "homework");
    assert.equal(lectureFileGetKind(false), "lecture");
    assert.equal(lectureFileGetKind(null), "lecture");
    assert.equal(lectureFileGetKind(undefined), "lecture");
  });
});

describe("lectureCardAttachments", () => {
  const files = [materials, homework, { id: "", fileName: "skip" }, null];

  it("splits files by homeWork flag", () => {
    assert.deepEqual(
      lectureCardAttachments({ files, homeWork: false }).map((file) => file.id),
      ["m1"]
    );
    assert.deepEqual(
      lectureCardAttachments({ files, homeWork: true }).map((file) => file.id),
      ["h1"]
    );
  });

  it("treats missing homeWork as materials, not homework", () => {
    const unlabeled = { id: "u1", fileName: "notes.txt" };

    assert.deepEqual(
      lectureCardAttachments({ files: [unlabeled], homeWork: false }).map(
        (file) => file.id
      ),
      ["u1"]
    );
    assert.deepEqual(
      lectureCardAttachments({ files: [unlabeled], homeWork: true }),
      []
    );
  });

  it("hides the list on a gated lecture even if cache still has files", () => {
    assert.deepEqual(
      lectureCardAttachments({
        gated: true,
        files,
        homeWork: false,
      }),
      []
    );
    assert.deepEqual(
      lectureCardAttachments({
        gated: true,
        files,
        homeWork: true,
      }),
      []
    );
  });

  it("does not list homework files when the tariff has no homework", () => {
    assert.deepEqual(
      lectureCardAttachments({
        files,
        homeWork: true,
        allowHomework: false,
      }),
      []
    );
    assert.deepEqual(
      lectureCardAttachments({
        files,
        homeWork: false,
        allowHomework: false,
      }).map((file) => file.id),
      ["m1"]
    );
  });

  it("returns an empty list when GraphQL files is empty like L4", () => {
    assert.deepEqual(
      lectureCardAttachments({ files: [], homeWork: false }),
      []
    );
    assert.deepEqual(
      lectureCardAttachments({ files: null, homeWork: true }),
      []
    );
  });
});
