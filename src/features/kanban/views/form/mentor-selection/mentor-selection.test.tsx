import { FormProvider, useForm } from "react-hook-form";
import { MemoryRouter } from "react-router-dom";
import { mentorsDto } from "shared/mocks/mentors.mock";
import { render } from "test/utils-test";
import MentorSelection from "./mentor-selection";
import { IFilterKanban } from "../form.types";

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
