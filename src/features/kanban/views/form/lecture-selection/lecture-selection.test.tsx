import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { trainingLectures } from "shared/mocks/training-lectures.mock";
import { render } from "test/utils-test";
import LectureSelection from "./lecture-selection";
import { IFilterKanban } from "../form.types";

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
