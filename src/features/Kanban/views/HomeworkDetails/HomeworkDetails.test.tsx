import { MemoryRouter } from "react-router-dom";
import HomeworkDetails from "./HomeworkDetails";
import { render } from "../../../../test/utilsTest";
import { studentHomeWorkDto } from "../../../../shared/mocks/studentHomeWorkDto.mock";

describe("HomeworkDetails", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkDetails
          card={studentHomeWorkDto}
          onClose={() => {}}
          showHomeworkDetails={true}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkDetails
          card={studentHomeWorkDto}
          onClose={() => {}}
          showHomeworkDetails={false}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
