import { MemoryRouter } from "react-router-dom";
import HomeworksOtherStudents from "./HomeworksOtherStudents";
import { mockDataHomeWorksByLectureId } from "../../../shared/mocks/dataHomeWorksByLectureId.mock";
import { render } from "../../../test/utilsTest";
import { mockDataUserId } from "../../../shared/mocks/dataUserId.mock";

const fetchMore: any = () => {};

describe("HomeworksOtherStudents", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworksOtherStudents
          dataUserId={mockDataUserId}
          fetchMore={fetchMore}
          data={mockDataHomeWorksByLectureId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
