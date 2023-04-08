import {
  LectureInfoDto,
  StudentHomeWorkStatus,
  UserDto,
} from "../../api/graphql/generated/graphql";

export const studentHomeWorkDto = {
  answer: "answer",
  creationDate: "2021-10-10T10:10:10.000Z",
  endCheckingDate: "2021-10-10T10:11:10.000Z",
  id: "123123",
  lecture: { id: "123123", name: "name" } as LectureInfoDto,
  mentor: {
    id: "123123",
    firstName: "firstName",
    lastName: "lastName",
  } as UserDto,
  startCheckingDate: "2021-10-10T12:10:10.000Z",
  status: StudentHomeWorkStatus.New,
  student: {
    id: "123123",
    firstName: "firstName",
    lastName: "lastName",
  } as UserDto,
};
