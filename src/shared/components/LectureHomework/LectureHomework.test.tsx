import { MemoryRouter } from "react-router-dom";
import LectureHomework from "./LectureHomework";
import { render } from "../../../test/utilsTest";
import { lectureHomework } from "../../mocks/lectureHomework.mock";

describe("LectureHomework", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureHomework dataLectureHomework={lectureHomework} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
