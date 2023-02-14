import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import UpdateHomework from "./UpdateHomework";

const mockSetUpdateHomeworkAnswer: any = () => {};
const mockUpdateHomeWork: any = () => {};

describe("UpdateHomework", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomework
          setUpdateHomeworkAnswer={mockSetUpdateHomeworkAnswer}
          loading={true}
          updateHomeWork={mockUpdateHomeWork}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateHomework
          setUpdateHomeworkAnswer={mockSetUpdateHomeworkAnswer}
          loading={false}
          updateHomeWork={mockUpdateHomeWork}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
