import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import UpdateHomework from "./UpdateHomework";

const mockSetOpenHomeWorkEdit: any = () => {};
const mockUpdateHomework: any = () => {};
const mockDataHomeworkId: any = "string";

describe("UpdateHomework", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomework
          setOpenHomeWorkEdit={mockSetOpenHomeWorkEdit}
          loading={true}
          updateHomework={mockUpdateHomework}
          dataHomeworkId={mockDataHomeworkId}
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
          dataHomeworkId={mockDataHomeworkId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
