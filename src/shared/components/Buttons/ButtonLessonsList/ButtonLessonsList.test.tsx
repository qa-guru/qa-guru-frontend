import { MemoryRouter } from "react-router-dom";
import ButtonLessonsList from "./ButtonLessonsList";
import { render } from "../../../../test/utilsTest";

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
