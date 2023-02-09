import { MemoryRouter } from "react-router-dom";
import { render } from "../../../../test/utilsTest";
import LectureDescription from "./LectureDescription";

const mockDescription: any = [];

describe("LectureDescription", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureDescription description={mockDescription!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
