import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { render } from "test/utils-test";
import InputSelect from "./input-select";

describe("InputSelect", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <InputSelect
              control={methods.control}
              name="testDate"
              placeholder="testDate"
              options={[{ value: "select", label: "label" }]}
              defaultValue="testDate"
              onChange={() => {}}
              disabled={false}
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
