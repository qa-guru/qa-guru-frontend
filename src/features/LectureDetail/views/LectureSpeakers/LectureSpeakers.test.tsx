import { MemoryRouter } from "react-router-dom";
import LectureSpeakers from "./LectureSpeakers";
import { render } from "../../../../test/utilsTest";
import { speakers } from "../../../../shared/mocks/speakers.mock";

describe("LectureSpeakers", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureSpeakers speakers={speakers} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
