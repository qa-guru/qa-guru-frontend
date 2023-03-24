import { MemoryRouter } from "react-router-dom";
import HomeworksOtherStudents from "./HomeworksOtherStudents";
import { mockDataUser } from "../../../shared/mocks/dataUser.mock";
import { mockDataHomeWorksByLectureId } from "../../../shared/mocks/dataHomeWorksByLectureId.mock";
import { render } from "../../../test/utilsTest";

const mockFetchMoreHomeWorksByLectureId: any = () => {};

describe("HomeworksOtherStudents", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworksOtherStudents
          fetchMore={mockFetchMoreHomeWorksByLectureId}
          data={mockDataHomeWorksByLectureId}
          dataUser={mockDataUser}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
