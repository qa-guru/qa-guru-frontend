export type LectureAttachment = {
  id?: string | null;
  homeWork?: boolean | null;
  fileName?: string | null;
  contentType?: string | null;
  size?: number | null;
};

export type LectureAttachmentWithId = LectureAttachment & { id: string };

export type LectureFileGetKind = "lecture" | "homework";

export function lectureFileGetKind(
  homeWork?: boolean | null
): LectureFileGetKind {
  return homeWork === true ? "homework" : "lecture";
}

function hasAttachmentId(
  file: LectureAttachment | null | undefined
): file is LectureAttachmentWithId {
  return typeof file?.id === "string" && file.id.length > 0;
}

export function lectureCardAttachments(input: {
  gated?: boolean;
  files?: Array<LectureAttachment | null> | null;
  homeWork: boolean;
  allowHomework?: boolean;
}): LectureAttachmentWithId[] {
  if (input.gated) {
    return [];
  }

  if (input.homeWork && input.allowHomework === false) {
    return [];
  }

  return (input.files ?? []).filter(
    (file): file is LectureAttachmentWithId =>
      hasAttachmentId(file) && Boolean(file.homeWork) === input.homeWork
  );
}
