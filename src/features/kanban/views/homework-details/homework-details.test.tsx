import { MemoryRouter } from "react-router-dom";
import HomeworkDetails from "./homework-details";
import { render } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/test/utils-test";
import { studentHomeWorkDto } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/shared/mocks/student-homework-dto.mock";

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
