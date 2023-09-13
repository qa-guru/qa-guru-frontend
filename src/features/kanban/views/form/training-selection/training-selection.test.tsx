import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import TrainingSelection from "./training-selection";
import { render } from "../../../../../test/utils-test";
import { IFilterKanban } from "../form.types";
import { trainingDto } from "../../../../../shared/mocks/training-dto.mock";

describe("TrainingSelection", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm<IFilterKanban>();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <TrainingSelection
              control={methods.control}
              items={[trainingDto]}
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
