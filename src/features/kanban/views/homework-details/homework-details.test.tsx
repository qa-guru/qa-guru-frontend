import { MemoryRouter } from "react-router-dom";
import HomeworkDetails from "./homework-details";
import { render } from "../../../../test/utils-test";
import { studentHomeWorkDto } from "../../../../shared/mocks/student-homework-dto.mock";

describe("HomeworkDetails", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkDetails card={studentHomeWorkDto} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
