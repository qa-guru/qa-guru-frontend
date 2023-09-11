import { FormProvider, useForm } from "react-hook-form";
import { MemoryRouter } from "react-router-dom";
import MentorSelection from "./MentorSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";
import { training } from "../../../../../shared/mocks/training.mock";

describe("MentorSelection", () => {
  it("renders correctly", () => {
    const methods = useForm<IFilterKanban>();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <MentorSelection control={methods.control} data={training}? />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
