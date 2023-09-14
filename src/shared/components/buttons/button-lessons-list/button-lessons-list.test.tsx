import { MemoryRouter } from "react-router-dom";
import ButtonLessonsList from "./button-lessons-list";
import { render } from "../../../../test/utils-test";

describe("ButtonLessonsList", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ButtonLessonsList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
