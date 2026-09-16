import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isNumericUserId, isOwnProfileAlias } from "./user-id-param";

describe("user-id-param", () => {
  it("treats profile as the own-profile alias, not a user id", () => {
    assert.equal(isOwnProfileAlias("profile"), true);
    assert.equal(isNumericUserId("profile"), false);
  });

  it("accepts numeric ids for user cards", () => {
    assert.equal(isNumericUserId("42"), true);
    assert.equal(isOwnProfileAlias("42"), false);
  });
});
