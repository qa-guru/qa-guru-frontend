import { MemoryRouter } from "react-router-dom";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { render } from "test/utils-test";
import InputText from "./input-text";

describe("InputTextField", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      const errors: FieldErrors = {};
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputText
              control={methods.control}
              name="testDate"
              placeholder="testDate"
              label="testDate"
              maxRows="4"
              minRows="2"
              errors={errors}
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
