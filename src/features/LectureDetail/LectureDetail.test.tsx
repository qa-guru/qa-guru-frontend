import { MemoryRouter } from "react-router-dom";
import LectureDetail from "./LectureDetail";
import { render } from "../../test/utilsTest";
import { mockDataLecture } from "../../shared/mocks/dataLecture.mock";
import { mockDataHomeWorkByLecture } from "../../shared/mocks/dataHomeWorkByLecture.mock";
import { mockDataLectureHomework } from "../../shared/mocks/dataLectureHomework.mock";

describe("LectureDetail", () => {
  it("hasHomework is true", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDetail
          dataLecture={mockDataLecture}
          dataHomeWorkByLecture={mockDataHomeWorkByLecture}
          dataLectureHomework={mockDataLectureHomework}
          hasHomework={true}
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
          dataHomeWorkByLecture={mockDataHomeWorkByLecture}
          dataLectureHomework={mockDataLectureHomework}
          hasHomework={false}
          tariffHomework={false}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
