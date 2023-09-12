import { MemoryRouter } from "react-router-dom";
import Form from "./form";
import { render } from "../../../../test/utils-test";

describe("Form", () => {
  it("form is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
