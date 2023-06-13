import { MemoryRouter } from "react-router-dom";
import HomeworkContent from "./HomeworkContent";
import { render } from "../../../../../test/utilsTest";
import { StudentHomeWorkStatus } from "../../../../../api/graphql/generated/graphql";

const mockSetOpenHomeWorkEdit = () => {};
describe("SendHomework", () => {
  it("status is New", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkContent
          answer="answer"
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          id="1234"
          openHomeWorkEdit={true}
          status={StudentHomeWorkStatus.New}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("status is Approved", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkContent
          answer="answer"
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          id="1234"
          openHomeWorkEdit={false}
          status={StudentHomeWorkStatus.Approved}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("status is InReview", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkContent
          answer="answer"
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          id="1234"
          openHomeWorkEdit={true}
          status={StudentHomeWorkStatus.InReview}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("status is NotApproved", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkContent
          answer="answer"
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          id="1234"
          openHomeWorkEdit={false}
          status={StudentHomeWorkStatus.NotApproved}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
