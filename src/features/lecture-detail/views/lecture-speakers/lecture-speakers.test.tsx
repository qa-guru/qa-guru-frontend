import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { speakers } from "shared/mocks/speakers.mock";
import LectureSpeakers from "./lecture-speakers";

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
