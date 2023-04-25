import { MemoryRouter } from "react-router-dom";
import UpdateHomework from "./UpdateHomework";
import { render } from "../../../../../test/utilsTest";

const mockSetOpenHomeWorkEdit: any = () => {};
const mockUpdateHomework: any = () => {};

describe("UpdateHomework", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomework
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
        <UpdateHomework
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
