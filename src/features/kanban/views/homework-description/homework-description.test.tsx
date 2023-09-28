import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { studentHomeWorkDto } from "shared/mocks/student-homework-dto.mock";
import HomeworkDescription from "./homework-description";

describe("HomeworkDescription", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkDescription card={studentHomeWorkDto} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkDescription card={studentHomeWorkDto} onClose={() => {}} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
