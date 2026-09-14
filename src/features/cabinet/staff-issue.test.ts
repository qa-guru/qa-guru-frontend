import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  STAFF_CONTOURS_PATH,
  httpErrorText,
  staffIssueBody,
  staffIssueStatusLine,
} from "./staff-issue";

describe("staffIssueBody", () => {
  it("puts student email in the POST body, not a staff JWT claim", () => {
    const body = staffIssueBody({
      email: "  oskar@example.com ",
      handle: " Oskar ",
    });

    assert.equal(STAFF_CONTOURS_PATH, "/api/staff/contours");
    assert.equal(body.email, "oskar@example.com");
    assert.equal(body.handle, "Oskar");
    assert.equal(body.courseId, "etalon");
    assert.equal("jwt" in body, false);
    assert.equal("accessToken" in body, false);
  });

  it("does not copy a teacher email onto the student field", () => {
    const teacher = "teacher@qa.guru";
    const body = staffIssueBody({
      email: "nina@example.com",
      handle: "nina",
    });

    assert.notEqual(body.email, teacher);
    assert.equal(body.email, "nina@example.com");
  });
});

describe("httpErrorText", () => {
  it("surfaces a 400 message from the server", () => {
    assert.equal(
      httpErrorText(400, { status: 400, message: "email required" }),
      "email required"
    );
    assert.equal(
      httpErrorText(400, { detail: "handle required" }),
      "handle required"
    );
  });

  it("keeps 400 visible when the body has no message", () => {
    assert.equal(httpErrorText(400, {}), "Запрос отклонён (400)");
  });

  it("maps quota and forbidden without inventing job fields", () => {
    assert.equal(
      httpErrorText(409, null),
      "Квота: один активный контур на курс"
    );
    assert.equal(httpErrorText(403, undefined), "Нет права выдавать контур");
  });
});

describe("staffIssueStatusLine", () => {
  it("shows queued or ready from the job, not extra fields", () => {
    assert.equal(staffIssueStatusLine("queued"), "Статус: queued");
    assert.equal(staffIssueStatusLine("ready"), "Статус: ready");
    assert.equal(
      staffIssueStatusLine("failed", "cli exited 1"),
      "Статус: failed — cli exited 1"
    );
  });
});
