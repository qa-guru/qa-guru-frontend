import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputDatePicker from "./InputDatePicker";
import { render } from "../../../../test/utilsTest";

describe("InputDatePicker", () => {
  it("renders correctly", () => {
    const methods = useForm();

    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });
});
