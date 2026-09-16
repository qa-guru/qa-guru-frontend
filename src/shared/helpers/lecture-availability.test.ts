import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  formatLectureAvailableFrom,
  hasLectureBody,
  isLectureAccessible,
  lectureCardBody,
  lectureCardTitle,
  lectureGateKind,
  lectureListChipLabel,
  lectureListFooter,
  lectureQueryFailureKind,
  lectureGateTitle,
  lectureGateBody,
  shouldShowLectureGate,
} from "./lecture-availability";

describe("lectureGateKind", () => {
  it("open when purchased slot is available and not locking", () => {
    assert.equal(
      lectureGateKind({ locking: false, isAvailable: true }),
      "open"
    );
  });

  it("locked wins over availableFrom", () => {
    assert.equal(
      lectureGateKind({
        locking: true,
        isAvailable: false,
        availableFrom: "2026-10-01T10:00:00",
      }),
      "locked"
    );
  });

  it("scheduled when not locking and isAvailable is false", () => {
    assert.equal(
      lectureGateKind({
        locking: false,
        isAvailable: false,
        availableFrom: "2026-10-01T10:00:00",
      }),
      "scheduled"
    );
  });

  it("missing slot is not a lock claim", () => {
    assert.equal(lectureGateKind(undefined), "open");
    assert.equal(isLectureAccessible(undefined), false);
  });
});

describe("isLectureAccessible", () => {
  it("requires a slot with isAvailable true and no locking", () => {
    assert.equal(
      isLectureAccessible({ locking: false, isAvailable: true }),
      true
    );
    assert.equal(
      isLectureAccessible({ locking: true, isAvailable: true }),
      false
    );
    assert.equal(
      isLectureAccessible({ locking: false, isAvailable: false }),
      false
    );
  });
});

describe("labels", () => {
  it("list chip shows availableFrom for a future lecture", () => {
    const slot = {
      locking: false,
      isAvailable: false,
      availableFrom: "2026-10-01T10:00:00",
    };

    assert.match(lectureListChipLabel(slot), /^Доступен с /);
    assert.equal(formatLectureAvailableFrom(slot.availableFrom), "01.10.2026 10:00");
    assert.equal(lectureListFooter(slot), "Скоро откроется");
    assert.match(lectureCardTitle(slot), /^Урок откроется /);
  });

  it("scheduled without a date is not shown as available", () => {
    const slot = { locking: false, isAvailable: false };

    assert.equal(lectureListChipLabel(slot), "Скоро откроется");
    assert.equal(lectureCardTitle(slot), "Урок ещё не открыт");
  });

  it("locked copy is not a load error", () => {
    const slot = { locking: true, isAvailable: false };

    assert.equal(lectureListChipLabel(slot), "Урок заблокирован");
    assert.equal(lectureListFooter(slot), "Урок недоступен");
    assert.equal(lectureCardTitle(slot), "Урок заблокирован");
    assert.match(lectureCardBody(slot), /не ошибка загрузки/);
  });
});

describe("shouldShowLectureGate", () => {
  it("L4 empty content on a gated slot is a gate, not missing data", () => {
    const slot = { locking: true, isAvailable: false };

    assert.equal(shouldShowLectureGate(slot, null), true);
    assert.equal(shouldShowLectureGate(slot, ""), true);
    assert.equal(shouldShowLectureGate(slot, "   "), true);
  });

  it("staff content on a gated slot is not a gate", () => {
    assert.equal(
      shouldShowLectureGate(
        { locking: true, isAvailable: false },
        "<p>hidden for students</p>"
      ),
      false
    );
  });

  it("open lecture with empty body is not a lock screen", () => {
    assert.equal(
      shouldShowLectureGate({ locking: false, isAvailable: true }, null),
      false
    );
    assert.equal(hasLectureBody(null), false);
  });
});

describe("lectureQueryFailureKind", () => {
  it("open slot without lecture DTO is denied, not Упс", () => {
    assert.equal(
      lectureQueryFailureKind({ locking: false, isAvailable: true }),
      "denied"
    );
    assert.equal(lectureGateTitle({ locking: false, isAvailable: true }, true), "Нет доступа к уроку");
    assert.match(lectureGateBody({ locking: false, isAvailable: true }, true), /не ошибка загрузки/);
  });

  it("locked slot keeps F1 copy when lecture query fails", () => {
    const slot = { locking: true, isAvailable: false };

    assert.equal(lectureQueryFailureKind(slot), "locked");
    assert.equal(lectureGateTitle(slot, true), "Урок заблокирован");
    assert.match(lectureGateBody(slot, true), /не ошибка загрузки/);
  });

  it("scheduled slot keeps F1 copy when lecture query fails", () => {
    const slot = {
      locking: false,
      isAvailable: false,
      availableFrom: "2026-10-01T10:00:00",
    };

    assert.equal(lectureQueryFailureKind(slot), "scheduled");
    assert.match(lectureGateTitle(slot, true), /^Урок откроется /);
  });
});
