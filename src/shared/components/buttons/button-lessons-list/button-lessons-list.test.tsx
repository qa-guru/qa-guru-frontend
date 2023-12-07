import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import ButtonLessonsList from "./button-lessons-list";

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
