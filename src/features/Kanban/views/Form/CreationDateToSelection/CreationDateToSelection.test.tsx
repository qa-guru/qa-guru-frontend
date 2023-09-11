import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import CreationDateToSelection from "./CreationDateToSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";

describe("CreationDateToSelection", () => {
  it("renders correctly", () => {
    const methods = useForm<IFilterKanban>();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <CreationDateToSelection control={methods.control} />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
