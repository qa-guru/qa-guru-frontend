import { MemoryRouter } from "react-router-dom";
import Form from "./Form";
import { render } from "../../../../test/utilsTest";

describe("Form", () => {
  it("Form is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
