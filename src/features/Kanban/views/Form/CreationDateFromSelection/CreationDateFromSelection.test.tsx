import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import CreationDateFromSelection from "./CreationDateFromSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";

describe("CreationDateFromSelection", () => {
  it("renders correctly", () => {
    const methods = useForm<IFilterKanban>();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <CreationDateFromSelection control={methods.control} />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
