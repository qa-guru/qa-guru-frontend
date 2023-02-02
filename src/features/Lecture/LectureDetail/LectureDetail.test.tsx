import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import LectureDetail from "./LectureDetail";
import { LectureHomeWorkQuery, LectureQuery } from "../../../generated/graphql";

const mockDataLecture: LectureQuery = {
  __typename: "Query",
  lecture: {
    __typename: "LectureInfoShortDto",
    id: "string",
    subject: "string",
    description: "string",
    content: "string",
    speakers: [
      {
        __typename: "UserDto",
        id: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
      },
    ],
  },
};

const mockDataLectureHomeWorkQuery: LectureHomeWorkQuery = {
  __typename: "Query",
  lectureHomeWork: "string",
};

describe("LectureDetail", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail
          dataLectureHomeWork={mockDataLectureHomeWorkQuery!}
          dataLecture={mockDataLecture!}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
