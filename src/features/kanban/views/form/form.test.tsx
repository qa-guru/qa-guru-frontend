import { MemoryRouter } from "react-router-dom";
import Form from "./form";
import { render } from "../../../../test/utils-test";

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
