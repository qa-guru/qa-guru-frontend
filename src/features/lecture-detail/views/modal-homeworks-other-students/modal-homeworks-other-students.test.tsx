import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { studentHomeWorkDto } from "shared/mocks/student-homework-dto.mock";
import { userId } from "shared/mocks/user-id.mock";

import ModalHomeworksOtherStudents from "./modal-homeworks-other-students";

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
