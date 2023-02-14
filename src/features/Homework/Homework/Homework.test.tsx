import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import Homework from "./Homework";
import { HomeWorkByStudentAndLectureQuery } from "../../../generated/graphql";

const mockData: HomeWorkByStudentAndLectureQuery = {
  __typename: "Query",
  homeWorkByStudentAndLecture: {
    __typename: "StudentHomeWorkDto",
    id: "string",
    answer: "string",
    status: null,
    creationDate: null,
    startCheckingDate: null,
    endCheckingDate: null,
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

describe("Homework", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Homework data={mockData!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
