import { MemoryRouter } from "react-router-dom";
import LectureTitle from "./LectureTitle";
import { render } from "../../../../test/utilsTest";

describe("LectureTitle", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureTitle title="Title" />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
