import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { roleOf } from "./idp-roles.ts";

describe("roleOf", () => {
  it("staff beats mentors and students", () => {
    assert.equal(roleOf(["/students", "/staff"]), "staff");
  });

  it("mentor is not staff", () => {
    assert.equal(roleOf(["/mentors"]), "mentor");
    assert.equal(roleOf(["/students"]), "student");
  });

  it("contour maps to student", () => {
    assert.equal(roleOf(["/contour"]), "student");
  });

  it("unknown groups have no learn role", () => {
    assert.equal(roleOf(["/contour-bot"]), null);
    assert.equal(roleOf([]), null);
  });
});
