import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { render } from "test/utils-test";
import InputDate from "./input-date";

describe("InputDatePicker", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputDate
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
