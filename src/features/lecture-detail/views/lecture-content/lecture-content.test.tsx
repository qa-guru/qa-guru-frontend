import { MemoryRouter } from "react-router-dom";
import LectureContent from "./lecture-content";
import { render } from "../../../../test/utils-test";
import { lectureContent } from "../../../../shared/mocks/letcure-content.mock";

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
