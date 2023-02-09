import { MemoryRouter } from "react-router-dom";
import { render } from "../../test/utilsTest";
import LecturesByTraining from "./LecturesByTraining";

describe("LecturesByTraining", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LecturesByTraining />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
