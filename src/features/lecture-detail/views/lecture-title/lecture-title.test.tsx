import { MemoryRouter } from "react-router-dom";
import LectureTitle from "./lecture-title";
import { render } from "../../../../test/utils-test";

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
