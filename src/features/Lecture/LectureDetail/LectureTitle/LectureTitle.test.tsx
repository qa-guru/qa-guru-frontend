import { MemoryRouter } from "react-router-dom";
import { render } from "../../../../test/utilsTest";
import LectureTitle from "./LectureTitle";

const title: string = "string";

describe("LectureTitle", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureTitle title={title!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
