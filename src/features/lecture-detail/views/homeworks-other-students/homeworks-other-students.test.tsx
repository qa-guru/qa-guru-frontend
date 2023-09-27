import { MemoryRouter } from "react-router-dom";
import { homeWorksByLectureId } from "shared/mocks/homeworks-by-lecture-id.mock";
import { render } from "test/utils-test";
import { userId } from "shared/mocks/user-id.mock";
import HomeworksOtherStudents from "./homeworks-other-students";

const fetchMore: any = () => {};

describe("HomeworksOtherStudents", () => {
  it("renders correctly", () => {
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
