import { MemoryRouter } from "react-router-dom";
import LectureDetail from "./LectureDetail";
import { render } from "../../test/utilsTest";
import { mockDataLecture } from "../../shared/mocks/dataLecture.mock";
import { mockDataLectureHomework } from "../../shared/mocks/dataLectureHomework.mock";

describe("LectureDetail", () => {
  it("hasHomework is true", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail
          dataLecture={mockDataLecture}
          dataLectureHomework={mockDataLectureHomework}
          tariffHomework={true}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("hasHomework is false", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail
          dataLecture={mockDataLecture}
          dataLectureHomework={mockDataLectureHomework}
          tariffHomework={false}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
