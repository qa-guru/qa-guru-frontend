import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputTextField from "./input-text-field";
import { render } from "../../../../test/utils-test";

describe("InputTextField", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputTextField
              control={methods.control}
              name="testDate"
              placeholder="testDate"
              label="testDate"
              maxRows="4"
              minRows="2"
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
