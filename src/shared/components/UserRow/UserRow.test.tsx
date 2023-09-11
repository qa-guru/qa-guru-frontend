import { MemoryRouter } from "react-router-dom";
import UserRow from "./UserRow";
import { render } from "../../../test/utilsTest";
import { studentHomeWorkDto } from "../../mocks/studentHomeWorkDto.mock";

describe("UserRow", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UserRow user={studentHomeWorkDto}? />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
