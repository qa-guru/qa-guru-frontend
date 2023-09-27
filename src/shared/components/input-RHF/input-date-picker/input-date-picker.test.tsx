import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { render } from "test/utils-test";
import InputDatePicker from "./input-date-picker";

describe("InputDatePicker", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputDatePicker
              control={methods.control}
              name="testDate"
              label="testDate"
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
