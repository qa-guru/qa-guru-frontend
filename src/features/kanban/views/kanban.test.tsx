import { MemoryRouter } from "react-router-dom";
import Kanban from "./kanban";
import { render } from "../../../test/utils-test";

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
