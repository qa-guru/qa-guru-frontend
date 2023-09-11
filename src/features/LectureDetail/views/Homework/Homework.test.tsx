import { MemoryRouter } from "react-router-dom";
import Homework from "./Homework";
import { render } from "../../../../test/utilsTest";
import { userId } from "../../../../shared/mocks/userId.mock";
import { studentHomeWorkDto } from "../../../../shared/mocks/studentHomeWorkDto.mock";

describe("Homework", () => {
  it("renders correctly", () => {
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
