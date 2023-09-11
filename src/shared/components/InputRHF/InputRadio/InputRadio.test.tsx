import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputRadio from "./InputRadio";
import { render } from "../../../../test/utilsTest";

describe("InputRadio", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputRadio
              control={methods.control}
              name="testDate"
              label="testDate"
              content={[{ value: "radio", label: "radio" }]}
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
