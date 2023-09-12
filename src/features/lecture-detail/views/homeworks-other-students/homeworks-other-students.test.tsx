import { MemoryRouter } from "react-router-dom";
import HomeworksOtherStudents from "./homeworks-other-students";
import { homeWorksByLectureId } from "../../../../shared/mocks/homeworks-by-lecture-id.mock";
import { render } from "../../../../test/utils-test";
import { userId } from "../../../../shared/mocks/user-id.mock";

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
