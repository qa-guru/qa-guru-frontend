import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputDatePicker from "./input-date-picker";
import { render } from "../../../../test/utils-test";

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
