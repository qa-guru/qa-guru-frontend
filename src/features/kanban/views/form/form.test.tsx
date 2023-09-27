import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import Form from "./form";

describe("Form", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Form />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
