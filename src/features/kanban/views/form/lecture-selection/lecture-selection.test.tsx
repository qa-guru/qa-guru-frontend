import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LectureSelection from "./lecture-selection";
import { render } from "../../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/test/utils-test";
import { IFilterKanban } from "../form.types";
import { trainingLectures } from "../../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/shared/mocks/training-lectures.mock";

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
