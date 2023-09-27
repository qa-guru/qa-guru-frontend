import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { studentHomeWorkDto } from "shared/mocks/student-homework-dto.mock";
import UserRow from "./user-row";

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
