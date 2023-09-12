import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import CreationDateFromSelection from "./CreationDateFromSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";

describe("CreationDateFromSelection", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm<IFilterKanban>();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <CreationDateFromSelection control={methods.control} />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
