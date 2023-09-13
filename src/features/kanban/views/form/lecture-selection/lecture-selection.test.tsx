import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LectureSelection from "./lecture-selection";
import { render } from "../../../../../test/utils-test";
import { IFilterKanban } from "../form.types";
import { trainingLectures } from "../../../../../shared/mocks/training-lectures.mock";

describe("LectureSelection", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm<IFilterKanban>();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <LectureSelection
              control={methods.control}
              data={trainingLectures}
            />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
