export interface ILectureContent {
  content: Array<{
    __typename?: "LectureContentDto";
    type?: string | null;
    value?: string | null;
    url?: string | null;
  } | null> | null;
}
