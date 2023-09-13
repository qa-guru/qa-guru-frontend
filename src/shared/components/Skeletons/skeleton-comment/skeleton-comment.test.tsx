import { MemoryRouter } from "react-router-dom";
import SkeletonComment from "./skeleton-comment";
import { render } from "../../../../test/utils-test";

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
