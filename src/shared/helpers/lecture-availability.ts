import dayjs from "dayjs";

export type LectureScheduleSlot = {
  locking?: boolean | null;
  availableFrom?: string | number | null;
  isAvailable?: boolean | null;
};

export type LectureGateKind = "open" | "locked" | "scheduled" | "denied";

const DATE_FORMAT = "DD.MM.YYYY HH:mm";

export function lectureGateKind(
  slot?: LectureScheduleSlot | null
): LectureGateKind {
  if (!slot) {
    return "open";
  }

  if (slot.locking) {
    return "locked";
  }

  if (slot.isAvailable !== true) {
    return "scheduled";
  }

  return "open";
}

export function isLectureAccessible(
  slot?: LectureScheduleSlot | null
): boolean {
  return Boolean(slot) && lectureGateKind(slot) === "open";
}

export function formatLectureAvailableFrom(
  availableFrom?: string | number | null
): string {
  if (availableFrom == null || availableFrom === "") {
    return "";
  }

  const parsed = dayjs(availableFrom);

  if (!parsed.isValid()) {
    return "";
  }

  return parsed.format(DATE_FORMAT);
}

export function lectureListChipLabel(
  slot?: LectureScheduleSlot | null
): string {
  const kind = lectureGateKind(slot);

  if (kind === "locked") {
    return "Урок заблокирован";
  }

  if (kind === "scheduled") {
    const when = formatLectureAvailableFrom(slot?.availableFrom);

    return when ? `Доступен с ${when}` : "Скоро откроется";
  }

  return "Доступен";
}

export function lectureListFooter(slot?: LectureScheduleSlot | null): string {
  const kind = lectureGateKind(slot);

  if (kind === "locked") {
    return "Урок недоступен";
  }

  if (kind === "scheduled") {
    return "Скоро откроется";
  }

  return "Продолжить";
}

export function lectureQueryFailureKind(
  slot?: LectureScheduleSlot | null
): Exclude<LectureGateKind, "open"> {
  const kind = lectureGateKind(slot);

  if (kind === "locked" || kind === "scheduled") {
    return kind;
  }

  return "denied";
}

export function lectureCardTitle(slot?: LectureScheduleSlot | null): string {
  const kind = lectureGateKind(slot);

  if (kind === "locked") {
    return "Урок заблокирован";
  }

  if (kind === "scheduled") {
    const when = formatLectureAvailableFrom(slot?.availableFrom);

    return when ? `Урок откроется ${when}` : "Урок ещё не открыт";
  }

  return "Доступен";
}

export function lectureCardBody(slot?: LectureScheduleSlot | null): string {
  const kind = lectureGateKind(slot);

  if (kind === "locked") {
    return "Материалы и домашнее задание скрыты, пока урок заблокирован. Это не ошибка загрузки.";
  }

  if (kind === "scheduled") {
    return "Материалы появятся в указанную дату. Пустая страница — не сбой, урок ещё не открыт.";
  }

  return "";
}

export function lectureGateTitle(
  slot?: LectureScheduleSlot | null,
  lectureMissing?: boolean
): string {
  const kind = lectureMissing
    ? lectureQueryFailureKind(slot)
    : lectureGateKind(slot);

  if (kind === "denied") {
    return "Нет доступа к уроку";
  }

  return lectureCardTitle(slot);
}

export function lectureGateBody(
  slot?: LectureScheduleSlot | null,
  lectureMissing?: boolean
): string {
  const kind = lectureMissing
    ? lectureQueryFailureKind(slot)
    : lectureGateKind(slot);

  if (kind === "denied") {
    return "Материалы и домашнее задание скрыты: нет покупки курса или урок закрыт. Это не ошибка загрузки.";
  }

  return lectureCardBody(slot);
}

export function hasLectureBody(content: unknown): boolean {
  if (content == null) {
    return false;
  }

  if (typeof content === "string") {
    return content.trim().length > 0;
  }

  if (Array.isArray(content)) {
    return content.length > 0;
  }

  return true;
}

export function shouldShowLectureGate(
  slot?: LectureScheduleSlot | null,
  content?: unknown
): boolean {
  return (
    Boolean(slot) &&
    lectureGateKind(slot) !== "open" &&
    !hasLectureBody(content)
  );
}

export function shouldSkipLectureHomework(
  tariffHomework: boolean,
  lecture: unknown,
  slot?: LectureScheduleSlot | null
): boolean {
  return (
    !tariffHomework ||
    lecture == null ||
    (slot != null && !isLectureAccessible(slot))
  );
}
