import { MemoryRouter } from "react-router-dom";
import LectureContent from "./LectureContent";
import { render } from "../../../../test/utilsTest";

const mockContentLecture: any = [];

describe("LectureContent", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureContent content={mockContentLecture!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
