import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import TrainingSelection from "./TrainingSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";

describe("TrainingSelection", () => {
  it("renders correctly", () => {
    const methods = useForm<IFilterKanban>();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <TrainingSelection control={methods.control} items={} />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
