import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import HomeworkWrapper from "./HomeworkWrapper";
import { HomeWorkByStudentAndLectureQuery } from "../../../generated/graphql";

const data: HomeWorkByStudentAndLectureQuery = {
  __typename: "Query",
  homeWorkByStudentAndLecture: {
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

describe("HomeworkWrapper", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkWrapper data={data!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
