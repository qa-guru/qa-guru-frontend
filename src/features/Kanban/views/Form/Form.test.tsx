import { MemoryRouter } from "react-router-dom";
import Form from "./Form";
import { render } from "../../../../test/utilsTest";

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
