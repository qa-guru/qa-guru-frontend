import { MemoryRouter } from "react-router-dom";
import Kanban from "./Kanban";
import { render } from "../../../test/utilsTest";

describe("Kanban", () => {
  it("Kanban is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Kanban />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
