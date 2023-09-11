import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputRadio from "./InputRadio";
import { render } from "../../../../test/utilsTest";

describe("InputRadio", () => {
  it("renders correctly", () => {
    const methods = useForm();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <InputRadio
            control={methods.control}
            name="testDate"
            label="testDate"
            content={}
          />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
