import { MemoryRouter } from "react-router-dom";
import HomeworkDetails from "./homework-details";
import { render } from "../../../../test/utils-test";
import { studentHomeWorkDto } from "../../../../shared/mocks/student-homework-dto.mock";

describe("HomeworkDetails", () => {
  it("homework-details is render", () => {
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
  it("homework-details is render", () => {
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
