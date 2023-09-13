import { MemoryRouter } from "react-router-dom";
import UserRow from "./user-row";
import { render } from "../../../test/utils-test";
import { studentHomeWorkDto } from "../../mocks/student-homework-dto.mock";

describe("UserRow", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserRow user={studentHomeWorkDto} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
