import { MemoryRouter } from "react-router-dom";
import LectureContent from "./LectureContent";
import { render } from "../../../../../test/utilsTest";
import { lectureContent } from "../../../../../shared/mocks/letcureContent.mock";

describe("LectureContent", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureContent content={lectureContent} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
