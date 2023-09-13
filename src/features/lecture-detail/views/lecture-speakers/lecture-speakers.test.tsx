import { MemoryRouter } from "react-router-dom";
import LectureSpeakers from "./lecture-speakers";
import { render } from "../../../../test/utils-test";
import { speakers } from "../../../../shared/mocks/speakers.mock";

describe("LectureSpeakers", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureSpeakers speakers={speakers} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
