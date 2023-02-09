import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import { LectureHomeWorkQuery } from "../../../generated/graphql";
import LectureHomework from "./LectureHomework";

const mockData: LectureHomeWorkQuery = {
  __typename: "Query",
  lectureHomeWork: "string",
};

describe("LectureHomework", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureHomework data={mockData!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
