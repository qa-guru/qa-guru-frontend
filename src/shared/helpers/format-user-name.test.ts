import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { formatUserFullName, formatUserInitials } from "./format-user-name";

describe("formatUserFullName", () => {
  it("joins first and last when both exist", () => {
    assert.equal(
      formatUserFullName({ user: { firstName: "Jane", lastName: "Doe" } }),
      "Jane Doe"
    );
  });

  it("keeps a single present part", () => {
    assert.equal(
      formatUserFullName({ user: { firstName: "Jane", lastName: null } }),
      "Jane"
    );
    assert.equal(
      formatUserFullName({ user: { firstName: undefined, lastName: "Doe" } }),
      "Doe"
    );
  });

  it("does not stringify missing names as undefined undefined", () => {
    assert.equal(formatUserFullName(), "");
    assert.equal(formatUserFullName({}), "");
    assert.equal(formatUserFullName({ user: null }), "");
    assert.equal(formatUserFullName({ user: {} }), "");
    assert.equal(
      formatUserFullName({
        user: { firstName: undefined, lastName: undefined },
      }),
      ""
    );
    assert.equal(
      formatUserFullName({ user: { firstName: null, lastName: null } }),
      ""
    );
  });

  it("falls back to name props when there is no user", () => {
    assert.equal(
      formatUserFullName({ firstName: "Jane", lastName: "Doe" }),
      "Jane Doe"
    );
    assert.equal(formatUserFullName({ firstName: "Jane" }), "Jane");
    assert.equal(formatUserFullName({ lastName: undefined }), "");
  });

  it("does not mix name props into a user without names", () => {
    assert.equal(
      formatUserFullName({
        user: {},
        firstName: "Jane",
        lastName: "Doe",
      }),
      ""
    );
  });

  it("ignores literal undefined/null strings and blank parts", () => {
    assert.equal(
      formatUserFullName({
        user: { firstName: "undefined", lastName: "undefined" },
      }),
      ""
    );
    assert.equal(
      formatUserFullName({ firstName: "null", lastName: "  " }),
      ""
    );
    assert.equal(
      formatUserFullName({ firstName: " Jane ", lastName: " Doe " }),
      "Jane Doe"
    );
  });
});

describe("formatUserInitials", () => {
  it("uses two letters for two words", () => {
    assert.equal(formatUserInitials("Jane Doe"), "JD");
  });

  it("uses one letter for one word", () => {
    assert.equal(formatUserInitials("Jane"), "J");
  });

  it("is empty when there is no usable name", () => {
    assert.equal(formatUserInitials(""), "");
    assert.equal(formatUserInitials(undefined), "");
    assert.equal(formatUserInitials("undefined undefined"), "");
  });
});
