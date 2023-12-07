import { MemoryRouter } from "react-router-dom";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { render } from "test/utils-test";

import InputPhone from "./input-phone";

describe("InputPhone", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      const errors: FieldErrors = {};
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputPhone
              control={methods.control}
              name="testDate"
              label="testDate"
              placeholder="testDate"
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
