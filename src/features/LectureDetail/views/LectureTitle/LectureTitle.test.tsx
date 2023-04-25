import { MemoryRouter } from "react-router-dom";
import LectureTitle from "./LectureTitle";
import { render } from "../../../../test/utilsTest";

describe("LectureTitle", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureTitle title="Title" />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
