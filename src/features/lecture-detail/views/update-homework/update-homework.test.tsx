import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import UpdateHomework from "./update-homework";

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
