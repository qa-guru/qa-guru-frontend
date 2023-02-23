import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import LectureDetail from "./LectureDetail";
import { LectureQuery } from "../../../generated/graphql";

const mockData: LectureQuery = {
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

describe("LectureDetail", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail data={mockData} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
