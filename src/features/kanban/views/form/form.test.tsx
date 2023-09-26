import { MemoryRouter } from "react-router-dom";
import Form from "./form";
import { render } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/test/utils-test";

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
