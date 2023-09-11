import { MemoryRouter } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LectureSelection from "./LectureSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";
import { trainingLectures } from "../../../../../shared/mocks/trainingLectures.mock";

describe("LectureSelection", () => {
  it("renders correctly", () => {
    const methods = useForm<IFilterKanban>();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <LectureSelection control={methods.control} data={trainingLectures} />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
