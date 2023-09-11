import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputTextField from "./InputTextField";
import { render } from "../../../../test/utilsTest";

describe("InputTextField", () => {
  it("renders correctly", () => {
    const methods = useForm();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <InputTextField
            control={methods.control}
            name="testDate"
            placeholder="testDate"
            label="testDate"
            type={}
            multiline={}
            maxRows="4"
            minRows="2"
            inputProps={}
          />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
