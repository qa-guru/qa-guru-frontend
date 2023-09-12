import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputTextField from "./InputTextField";
import { render } from "../../../../test/utilsTest";

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
