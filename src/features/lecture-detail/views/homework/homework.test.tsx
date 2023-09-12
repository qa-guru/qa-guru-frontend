import { MemoryRouter } from "react-router-dom";
import Homework from "./homework";
import { render } from "../../../../test/utils-test";
import { userId } from "../../../../shared/mocks/user-id.mock";
import { studentHomeWorkDto } from "../../../../shared/mocks/student-homework-dto.mock";

describe("Homework", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Homework
          dataHomeWorkByLecture={studentHomeWorkDto}
          dataUserId={userId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
