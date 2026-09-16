import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  catalogEntityMissingLabel,
  isLectureEntityMissing,
  isTrainingEntityMissing,
} from "./catalog-entity";

describe("catalogEntityMissingLabel", () => {
  it("is a missing-entity empty, not Упс and not F1 purchase copy", () => {
    assert.equal(catalogEntityMissingLabel("training"), "Курс не найден");
    assert.equal(catalogEntityMissingLabel("lecture"), "Урок не найден");
    assert.equal(/упс|покупк/i.test(catalogEntityMissingLabel("training")), false);
    assert.equal(/упс|покупк/i.test(catalogEntityMissingLabel("lecture")), false);
  });
});

describe("isTrainingEntityMissing", () => {
  it("is missing only when the training query is NOT_FOUND", () => {
    assert.equal(
      isTrainingEntityMissing(null, {
        graphQLErrors: [
          {
            message: "Training with ID '99999' not found",
            extensions: { classification: "NOT_FOUND" },
          },
        ],
      }),
      true
    );
    assert.equal(
      isTrainingEntityMissing({ id: "1" }, {
        graphQLErrors: [
          { extensions: { classification: "NOT_FOUND" } },
        ],
      }),
      false
    );
    assert.equal(
      isTrainingEntityMissing(null, {
        graphQLErrors: [
          {
            message: "Internal error",
            extensions: { classification: "INTERNAL_ERROR" },
          },
        ],
      }),
      false
    );
  });
});

describe("isLectureEntityMissing", () => {
  it("missing lecture without a course slot is not F1 denied", () => {
    assert.equal(isLectureEntityMissing(null, undefined), true);
    assert.equal(isLectureEntityMissing(undefined, null), true);
  });

  it("keeps a locked or purchased slot as the F1 gate", () => {
    assert.equal(
      isLectureEntityMissing(null, { locking: true, isAvailable: false }),
      false
    );
    assert.equal(
      isLectureEntityMissing(null, { locking: false, isAvailable: true }),
      false
    );
  });

  it("live lecture DTO is not a missing entity", () => {
    assert.equal(isLectureEntityMissing({ id: "1" }, undefined), false);
  });
});
