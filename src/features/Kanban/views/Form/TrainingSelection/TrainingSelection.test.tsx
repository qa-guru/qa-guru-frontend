import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import TrainingSelection from "./TrainingSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";
import { trainingDto } from "../../../../../shared/mocks/trainingDto.mock";

describe("TrainingSelection", () => {
  it("renders correctly", () => {
    const methods = useForm<IFilterKanban>();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <TrainingSelection control={methods.control} items={[trainingDto]} />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
