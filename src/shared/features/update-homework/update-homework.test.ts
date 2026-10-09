import "../../../../test-setup/jsdom-env.mjs";

import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import {
  SendHomeWorkToCheckDocument,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";
import { createCustomTheme, initialSettings } from "theme";

import UpdateHomework from "./view/update-homework";

const h = React.createElement;
const theme = createCustomTheme(initialSettings);
const answer = "<p>Corrected synthetic answer</p>";
const tick = () => new Promise((resolve) => setTimeout(resolve, 30));
const deferred = () => {
  let resolve!: (value: unknown) => void;
  const promise = new Promise((done) => {
    resolve = done;
  });
  return { promise, resolve };
};
const response = (field: string, id = "hw1") => ({
  data: {
    [field]: {
      id,
      answer,
      status:
        field === "updateHomeWork"
          ? StudentHomeWorkStatus.NotApproved
          : StudentHomeWorkStatus.InReview,
      updateDate: "2026-10-04T12:00:00",
    },
  },
});

const setup = (
  options: {
    save?: () => Promise<unknown>;
    failSubmit?: boolean;
    saveError?: unknown;
    submitError?: unknown;
    refreshHomework?: () => void;
  } = {}
) => {
  const calls: string[] = [];
  const closed: boolean[] = [];
  const props = {
    loading: false,
    homeWorkId: "hw1",
    answer,
    resubmit: true,
    setOpenHomeWorkEdit: (open: boolean) => closed.push(open),
    updateHomework: () => {
      calls.push("updateHomeWork");
      if (options.saveError) return Promise.reject(options.saveError);
      return options.save
        ? options.save()
        : Promise.resolve(response("updateHomeWork"));
    },
    sendHomeWorkToCheck: () => {
      calls.push("sendHomeWorkToCheck");
      if (options.submitError) return Promise.reject(options.submitError);
      if (options.failSubmit)
        return Promise.reject(new Error("Synthetic submit failure"));
      return Promise.resolve(response("sendHomeWorkToCheck"));
    },
    refreshHomework: options.refreshHomework,
  };
  const node = (values = props) =>
    h(ThemeProvider, { theme }, h(UpdateHomework, values as never));
  return { ...render(node()), props, node, calls, closed };
};

const submitButton = () =>
  screen.getByRole("button", {
    name: /^(Отправить|Отправить повторно|Повторить отправку)$/,
  });

const ready = async () => {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (
      document.querySelector(".ProseMirror")?.textContent ===
      "Corrected synthetic answer"
    )
      return;
    await act(tick);
  }
  assert.fail("The production editor did not initialize");
};

const selectedFields = () => {
  const operation = SendHomeWorkToCheckDocument.definitions[0] as never as {
    selectionSet: {
      selections: Array<{
        selectionSet: { selections: Array<{ name: { value: string } }> };
      }>;
    };
  };
  return operation.selectionSet.selections[0].selectionSet.selections.map(
    (field) => field.name.value
  );
};

describe("UpdateHomework resubmission", () => {
  afterEach(() => cleanup());

  it("waits for confirmed save and then submits the existing homework", async () => {
    const save = deferred();
    const { calls, closed } = setup({ save: () => save.promise });
    await ready();
    await act(async () => {
      fireEvent.click(submitButton());
      await tick();
    });
    assert.deepEqual(calls, ["updateHomeWork"]);
    assert.deepEqual(closed, []);
    await act(async () => {
      save.resolve(response("updateHomeWork"));
      await tick();
    });
    assert.deepEqual(calls, ["updateHomeWork", "sendHomeWorkToCheck"]);
    assert.deepEqual(closed, [false]);
  });

  it("preserves the draft and retries only submit after a confirmed save", async () => {
    const options = { failSubmit: true };
    const { calls, closed, container } = setup(options);
    await ready();
    await act(async () => {
      fireEvent.click(submitButton());
      await tick();
    });
    assert.deepEqual(closed, []);
    assert.equal(
      container.querySelector(".ProseMirror")?.textContent,
      "Corrected synthetic answer"
    );
    options.failSubmit = false;
    await ready();
    await act(async () => {
      fireEvent.click(submitButton());
      await tick();
    });
    assert.deepEqual(calls, [
      "updateHomeWork",
      "sendHomeWorkToCheck",
      "sendHomeWorkToCheck",
    ]);
    assert.deepEqual(closed, [false]);
  });

  it("coalesces double clicks while the save is pending", async () => {
    const save = deferred();
    const { calls } = setup({ save: () => save.promise });
    await ready();
    await act(async () => {
      const button = submitButton();
      fireEvent.click(button);
      fireEvent.click(button);
      await tick();
      save.resolve(response("updateHomeWork"));
      await tick();
    });
    assert.deepEqual(calls, ["updateHomeWork", "sendHomeWorkToCheck"]);
  });

  it("does not close or clear another homework when an old save resolves", async () => {
    const save = deferred();
    const { calls, closed, props, node, rerender, container } = setup({
      save: () => save.promise,
    });
    await ready();
    await act(async () => {
      fireEvent.click(submitButton());
      await tick();
    });
    rerender(
      node({
        ...props,
        homeWorkId: "hw2",
        answer: "<p>Second synthetic answer</p>",
      })
    );
    await act(async () => {
      save.resolve(response("updateHomeWork"));
      await tick();
    });
    assert.deepEqual(closed, []);
    assert.deepEqual(calls, ["updateHomeWork"]);
    assert.equal(
      container.querySelector(".ProseMirror")?.textContent,
      "Second synthetic answer"
    );
  });

  it("reports a server state rejection, refreshes the homework and keeps the draft", async () => {
    const refreshed: string[] = [];
    const { calls, closed, container } = setup({
      refreshHomework: () => refreshed.push("refresh"),
      submitError: {
        message: "Invalid homework state",
        graphQLErrors: [
          {
            message: "Invalid homework state",
            extensions: { classification: "BAD_REQUEST" },
          },
        ],
      },
    });
    await ready();
    await act(async () => {
      fireEvent.click(submitButton());
      await tick();
    });
    assert.deepEqual(closed, []);
    assert.equal(
      container.querySelector(".ProseMirror")?.textContent,
      "Corrected synthetic answer"
    );
    assert.ok(
      screen.getByText(/изменился на сервере|актуальн/i, { exact: false })
    );
    assert.deepEqual(refreshed, ["refresh"]);
    assert.deepEqual(calls, ["updateHomeWork", "sendHomeWorkToCheck"]);
  });

  it("reports not found without blaming the student save and refreshes", async () => {
    const refreshed: string[] = [];
    const { calls, closed, container } = setup({
      refreshHomework: () => refreshed.push("refresh"),
      saveError: {
        graphQLErrors: [
          {
            message: "Object not found",
            extensions: { classification: "NOT_FOUND" },
          },
        ],
      },
    });
    await ready();
    await act(async () => {
      fireEvent.click(submitButton());
      await tick();
    });
    assert.deepEqual(closed, []);
    assert.equal(
      container.querySelector(".ProseMirror")?.textContent,
      "Corrected synthetic answer"
    );
    assert.ok(screen.getByText(/не найден или недоступен/i));
    assert.equal(screen.queryByText(/Не удалось завершить сохранение/), null);
    assert.deepEqual(refreshed, ["refresh"]);
    assert.deepEqual(calls, ["updateHomeWork"]);
  });

  it("does not refresh the homework after a generic submit failure", async () => {
    const refreshed: string[] = [];
    const { calls } = setup({
      refreshHomework: () => refreshed.push("refresh"),
      failSubmit: true,
    });
    await ready();
    await act(async () => {
      fireEvent.click(submitButton());
      await tick();
    });
    assert.ok(
      screen.getByText(
        /Ответ сохранён, но отправка на проверку не подтверждена/
      )
    );
    assert.deepEqual(refreshed, []);
    assert.deepEqual(calls, ["updateHomeWork", "sendHomeWorkToCheck"]);
  });

  it("selects an answer file without crashing or inserting it twice", async () => {
    const { container } = setup();
    await ready();
    const input = container.querySelector('input[type="file"]:not([accept])');
    assert.ok(input);
    await act(async () => {
      fireEvent.change(input, {
        target: { files: [new File(["Synthetic evidence"], "answer.txt")] },
      });
      await tick();
    });
    assert.equal(
      container.querySelectorAll(".ProseMirror [data-node-view-wrapper]")
        .length,
      1
    );
    assert.ok(
      container
        .querySelector(".ProseMirror")
        ?.textContent?.includes("answer.txt")
    );
  });

  it("requests backend status and updateDate in the submission response", () => {
    assert.ok(selectedFields().includes("status"));
    assert.ok(selectedFields().includes("updateDate"));
  });
});
