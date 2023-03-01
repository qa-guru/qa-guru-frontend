import { MemoryRouter } from "react-router-dom";
import LectureDetail from "./LectureDetail";
import { render } from "../../test/utilsTest";
import {
  HomeWorkByLectureQuery,
  LectureHomeWorkQuery,
  LectureQuery,
} from "../../api/graphql/generated/graphql";

const mockDataLecture: LectureQuery = {
  __typename: "Query",
  lecture: {
    __typename: "LectureInfoShortDto",
    id: "string",
    subject: "string",
    description: ["string1", "string2"],
    speakers: [
      {
        __typename: "UserDto",
        id: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
      },
    ],
    homeWorkLevel: {
      __typename: "LectureHomeWorkLevelDto",
      id: "string",
      code: "string",
      description: "string",
      estimate: 7,
    },
    content: [
      {
        __typename: "LectureContentDto",
        type: "string",
        value: "string",
        url: "string",
      },
    ],
  },
};

const mockDataHomeWorkByLecture: HomeWorkByLectureQuery = {
  __typename: "Query",
  homeWorkByLecture: {
    __typename: "StudentHomeWorkDto",
    id: "string",
    answer: "string",
    status: null,
    creationDate: new Date(),
    startCheckingDate: new Date(),
    endCheckingDate: new Date(),
    lecture: {
      __typename: "LectureInfoDto",
      id: "string",
      subject: "string",
    },
    student: {
      __typename: "UserDto",
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
    mentor: {
      __typename: "UserDto",
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
  },
};

const mockDataLectureHomework: LectureHomeWorkQuery = {
  __typename: "Query",
  lectureHomeWork: [
    {
      __typename: "LectureContentHomeWorkDto",
      type: "string",
      value: "string",
      url: "string",
    },
  ],
};

describe("LectureDetail", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail
          dataLecture={mockDataLecture}
          dataHomeWorkByLecture={mockDataHomeWorkByLecture}
          dataLectureHomework={mockDataLectureHomework}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
