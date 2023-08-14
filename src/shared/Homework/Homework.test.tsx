import { MemoryRouter } from "react-router-dom";
import Homework from "./Homework";
import { render } from "../../test/utilsTest";
import { userId } from "../mocks/userId.mock";
import { studentHomeWorkDto } from "../mocks/studentHomeWorkDto.mock";

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
