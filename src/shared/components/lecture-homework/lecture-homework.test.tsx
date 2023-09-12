import { MemoryRouter } from "react-router-dom";
import LectureHomework from "./lecture-homework";
import { render } from "../../../test/utils-test";

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
