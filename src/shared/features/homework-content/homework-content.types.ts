import { Dispatch, SetStateAction } from "react";

import {
  StudentHomeWorkStatus,
  Maybe,
  TestGroupDto,
  StudentHomeWorkFilesDto,
} from "api/graphql/generated/graphql";

export interface IHomeworkContent {
  status?: Maybe<StudentHomeWorkStatus>;
  answer?: Maybe<string>;
  openHomeWorkEdit: boolean;
  setOpenHomeWorkEdit: Dispatch<SetStateAction<boolean>>;
  homeWorkId?: Maybe<string>;
  files?: Array<Maybe<StudentHomeWorkFilesDto>> | null;
  testGroup?: TestGroupDto;
  trainingId?: string;
  lectureId?: string;
}
