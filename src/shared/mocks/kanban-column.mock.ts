import {
  LectureInfoDto,
  StudentHomeWorkStatus,
  UserDto,
} from "api/graphql/generated/graphql";
import { IColumnItem } from "features/kanban/views/column/column.types";

export const kanbanColumn: IColumnItem = {
  id: "column1",
  title: StudentHomeWorkStatus.New,
  cards: [
    {
      id: "card1",
      answer: "This is a test answer",
      creationDate: "2023-04-24T12:00:00",
      endCheckingDate: "2023-04-30T12:00:00",
      lecture: { id: "123123", name: "name" } as LectureInfoDto,
      mentor: {
        id: "mentor1",
        name: "John Doe",
      } as UserDto,
      startCheckingDate: "2023-04-25T12:00:00",
      status: StudentHomeWorkStatus.New,
      student: {
        id: "student1",
        name: "Jane Doe",
      } as UserDto,
      allowedColumns: ["column1", "column2"],
    },
    {
      id: "card2",
      answer: "This is another test answer",
      creationDate: "2023-04-22T12:00:00",
      endCheckingDate: "2023-04-28T12:00:00",
      lecture: { id: "123123", name: "name" } as LectureInfoDto,
      mentor: {
        id: "mentor2",
        name: "Bob Smith",
      } as UserDto,
      startCheckingDate: "2023-04-23T12:00:00",
      status: StudentHomeWorkStatus.InReview,
      student: {
        id: "student2",
        name: "Alice Johnson",
      } as UserDto,
      allowedColumns: ["column2", "column3"],
    },
  ],
  totalElements: 7,
};
