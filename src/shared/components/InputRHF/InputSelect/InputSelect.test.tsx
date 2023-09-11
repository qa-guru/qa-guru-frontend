import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputSelect from "./InputSelect";
import { render } from "../../../../test/utilsTest";

describe("InputSelect", () => {
  it("renders correctly", () => {
    const methods = useForm();

    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });
});
