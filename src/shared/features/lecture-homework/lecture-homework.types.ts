import { ReactNode } from "react";

import { Maybe } from "api/graphql/generated/graphql";

export interface ILectureHomework {
  lectureHomeWork?: Maybe<string>;
  children?: ReactNode;
}
