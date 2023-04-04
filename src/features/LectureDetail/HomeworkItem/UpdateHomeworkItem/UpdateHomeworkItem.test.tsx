import { MemoryRouter } from "react-router-dom";
import UpdateHomeworkItem from "./UpdateHomeworkItem";
import { render } from "../../../../test/utilsTest";

const mockSetOpenHomeWorkEdit: any = () => {};
const mockUpdateHomework: any = () => {};

describe("UpdateHomeworkItem", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomeworkItem
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          loading={true}
          updateHomework={mockUpdateHomework}
          answer="string"
          id="string"
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomeworkItem
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          loading={false}
          updateHomework={mockUpdateHomework}
          answer="string"
          id="string"
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
