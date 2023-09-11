import { MemoryRouter } from "react-router-dom";
import ModalHomeworksOtherStudents from "./ModalHomeworksOtherStudents";
import { render } from "../../../../test/utilsTest";
import { studentHomeWorkDto } from "../../../../shared/mocks/studentHomeWorkDto.mock";
import { userId } from "../../../../shared/mocks/userId.mock";

describe("ModalHomeworksOtherStudents", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ModalHomeworksOtherStudents
          item={studentHomeWorkDto}
          dataUserId={userId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
