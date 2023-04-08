import { MemoryRouter } from "react-router-dom";
import HomeworkItem from "./HomeworkItem";
import { render } from "../../../../../test/utilsTest";
import { studentHomeWorkDto } from "../../../../../shared/mocks/studentHomeWorkDto.mock";
import { userId } from "../../../../../shared/mocks/userId.mock";

describe("HomeworkItem", () => {
  it("the component is render", () => {
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
