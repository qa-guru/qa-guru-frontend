import { MemoryRouter } from "react-router-dom";
import HomeworksOtherStudents from "./HomeworksOtherStudents";
import { homeWorksByLectureId } from "../../../../../shared/mocks/homeWorksByLectureId.mock";
import { render } from "../../../../../test/utilsTest";
import { userId } from "../../../../../shared/mocks/userId.mock";

const fetchMore: any = () => {};

describe("HomeworksOtherStudents", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworksOtherStudents
          dataUserId={userId}
          fetchMore={fetchMore}
          data={homeWorksByLectureId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
