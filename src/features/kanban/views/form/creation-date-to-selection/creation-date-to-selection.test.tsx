import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import CreationDateToSelection from "./creation-date-to-selection";
import { render } from "../../../../../test/utils-test";
import { IFilterKanban } from "../form.types";

describe("CreationDateToSelection", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm<IFilterKanban>();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <CreationDateToSelection control={methods.control} />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
