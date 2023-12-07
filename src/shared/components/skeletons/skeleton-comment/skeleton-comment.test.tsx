import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import SkeletonComment from "./skeleton-comment";

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
