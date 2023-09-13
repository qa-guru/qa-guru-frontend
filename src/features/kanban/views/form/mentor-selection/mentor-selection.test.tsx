import { FormProvider, useForm } from "react-hook-form";
import { MemoryRouter } from "react-router-dom";
import MentorSelection from "./mentor-selection";
import { render } from "../../../../../test/utils-test";
import { IFilterKanban } from "../form.types";
import { mentorsDto } from "../../../../../shared/mocks/mentors.mock";

describe("MentorSelection", () => {
  it("renders correctly", () => {
    function TestComponent() {
      const methods = useForm<IFilterKanban>();
      return (
        <MemoryRouter>
          <FormProvider {...methods}>
            <MentorSelection control={methods.control} data={mentorsDto} />
          </FormProvider>
        </MemoryRouter>
      );
    }

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });
});
