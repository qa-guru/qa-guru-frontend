import { MemoryRouter } from "react-router-dom";
import Kanban from "./Kanban";
import { render } from "../../../test/utilsTest";

describe("Kanban", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Kanban />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
