import "../../../../test-setup/jsdom-env.mjs";

import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { userIdVar } from "cache";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { createCustomTheme, initialSettings } from "theme";

import HomeworkItem from "./homework-item";

const h = React.createElement;
const theme = createCustomTheme(initialSettings);

const dto = (
  status: StudentHomeWorkStatus,
  fields: Record<string, unknown> = {}
) => ({
  id: "hw1",
  status,
  answer: "<p>Synthetic answer</p>",
  creationDate: "2026-10-03T12:00:00",
  updateDate: "2026-10-04T12:05:00",
  startCheckingDate: "2026-10-04T12:02:00",
  endCheckingDate: "2026-10-04T12:03:00",
  student: { id: "student-1", firstName: "Synthetic", lastName: "Student" },
  mentor: { id: "mentor-1", firstName: "Synthetic", lastName: "Mentor" },
  ...fields,
});

const setup = async (
  status: StudentHomeWorkStatus,
  fields: Record<string, unknown> = {},
  currentUser = "student-1"
) => {
  userIdVar(currentUser);
  const view = render(
    h(
      MemoryRouter,
      {},
      h(
        ThemeProvider,
        { theme },
        h(HomeworkItem, {
          dataHomeWorkByLectureAndTraining: dto(status, fields),
        } as never)
      )
    )
  );
  await screen.findByText("Synthetic answer");
  return view;
};

const editButton = () =>
  screen.queryByRole("button", {
    name: /^(Редактировать|Исправить и отправить повторно)$/,
  });

describe("HomeworkItem status contract", () => {
  afterEach(() => {
    cleanup();
    userIdVar(null);
  });

  it("shows updateDate as the submission date for REVIEW", async () => {
    await setup(StudentHomeWorkStatus.Review, { endCheckingDate: null });
    assert.ok(screen.getByText("04.10.2026 | 12:05"));
    assert.equal(screen.queryByText("04.10.2026 | 12:03"), null);
    assert.ok(screen.getByText("Отправлено на проверку"));
    assert.equal(editButton(), null);
    assert.equal(
      document.querySelectorAll('.ProseMirror[contenteditable="true"]').length,
      0
    );
  });

  it("lets the owner correct and resubmit a NOT_APPROVED homework", async () => {
    await setup(StudentHomeWorkStatus.NotApproved);
    assert.ok(
      screen.getByRole("button", {
        name: "Исправить и отправить повторно",
      })
    );
    assert.equal(screen.queryByText("Отправлено на проверку"), null);
    assert.ok(screen.getAllByText("04.10.2026 | 12:03").length >= 1);
  });

  it("lets the owner edit a NEW draft", async () => {
    await setup(StudentHomeWorkStatus.New, {
      mentor: null,
      startCheckingDate: null,
      endCheckingDate: null,
    });
    assert.ok(screen.getByRole("button", { name: "Редактировать" }));
    assert.ok(screen.getByText("04.10.2026 | 12:05"));
  });

  it("locks editing for IN_REVIEW", async () => {
    await setup(StudentHomeWorkStatus.InReview);
    assert.equal(editButton(), null);
    assert.equal(screen.queryByText("Отправлено на проверку"), null);
    assert.ok(screen.getAllByText("04.10.2026 | 12:02").length >= 1);
  });

  it("locks editing for APPROVED", async () => {
    await setup(StudentHomeWorkStatus.Approved);
    assert.equal(editButton(), null);
    assert.ok(screen.getAllByText("04.10.2026 | 12:03").length >= 1);
  });

  it("hides editing from a user who is not the homework owner", async () => {
    await setup(StudentHomeWorkStatus.NotApproved, {}, "mentor-1");
    assert.equal(editButton(), null);
  });
});
