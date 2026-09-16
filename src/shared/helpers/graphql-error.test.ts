import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isGraphqlNotFound } from "./graphql-error";

describe("isGraphqlNotFound", () => {
  it("accepts B26 GraphQL classification", () => {
    assert.equal(
      isGraphqlNotFound({
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
      isGraphqlNotFound({
        graphQLErrors: [
          {
            message: "Lecture with ID '99999' not found",
            extensions: { errorType: "NOT_FOUND" },
          },
        ],
      }),
      true
    );
  });

  it("accepts the B26 message when extensions are missing", () => {
    assert.equal(
      isGraphqlNotFound({
        message: "Training with ID '99999' not found",
      }),
      true
    );
  });

  it("does not treat F1 access errors or Упс internals as missing", () => {
    assert.equal(isGraphqlNotFound(null), false);
    assert.equal(
      isGraphqlNotFound({ message: "Access Denied" }),
      false
    );
    assert.equal(
      isGraphqlNotFound({
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
