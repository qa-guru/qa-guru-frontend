import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import TrainingSelection from "./TrainingSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";
import { trainingDto } from "../../../../../shared/mocks/trainingDto.mock";

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
