import { MemoryRouter } from "react-router-dom";
import LectureHomework from "./LectureHomework";
import { render } from "../../../test/utilsTest";

describe("LectureHomework", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureHomework />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
