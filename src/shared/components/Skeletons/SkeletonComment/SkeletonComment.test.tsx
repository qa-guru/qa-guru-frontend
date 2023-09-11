import { MemoryRouter } from "react-router-dom";
import SkeletonComment from "./SkeletonComment";
import { render } from "../../../../test/utilsTest";

describe("SkeletonComment", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SkeletonComment />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
