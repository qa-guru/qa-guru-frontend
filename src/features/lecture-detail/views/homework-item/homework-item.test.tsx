import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { studentHomeWorkDto } from "shared/mocks/student-homework-dto.mock";
import { userId } from "shared/mocks/user-id.mock";
import HomeworkItem from "./homework-item";

describe("HomeworkItem", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkItem
          dataHomeWorkByLecture={studentHomeWorkDto}
          dataUserId={userId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
