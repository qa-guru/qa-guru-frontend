import { FormProvider, useForm } from "react-hook-form";
import { MemoryRouter } from "react-router-dom";
import MentorSelection from "./MentorSelection";
import { render } from "../../../../../test/utilsTest";
import { IFilterKanban } from "../Form.types";
import { mentorsDto } from "../../../../../shared/mocks/mentors.mock";

describe("MentorSelection", () => {
  it("renders correctly", () => {
    const methods = useForm<IFilterKanban>();

    const { asFragment } = render(
      <MemoryRouter>
        <FormProvider {...methods}>
          <MentorSelection control={methods.control} data={mentorsDto} />
        </FormProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
