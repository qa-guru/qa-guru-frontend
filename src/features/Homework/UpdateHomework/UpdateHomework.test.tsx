import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import UpdateHomework from "./UpdateHomework";

const mockSetOpenHomeWorkEdit: any = () => {};
const mockUpdateHomework: any = () => {};
const mockDataHomework: any = "string";

describe("UpdateHomework", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomework
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          loading={true}
          updateHomework={mockUpdateHomework}
          dataHomework={mockDataHomework}
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
          dataHomework={mockDataHomework}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
