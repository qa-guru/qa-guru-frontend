import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputPhone from "./InputPhone";
import { render } from "../../../../test/utilsTest";

describe("InputPhone", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputPhone
              control={methods.control}
              name="testDate"
              label="testDate"
              placeholder="testDate"
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
