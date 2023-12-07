import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import Kanban from "./kanban";

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
