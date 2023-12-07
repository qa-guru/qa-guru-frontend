import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { studentHomeWorkDto } from "shared/mocks/student-homework-dto.mock";

import HomeworkDetails from "./homework-details";

describe("HomeworkDescription", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkDetails card={studentHomeWorkDto} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkDetails card={studentHomeWorkDto} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
