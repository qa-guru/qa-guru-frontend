import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import CommentTotalElements from "./comment-total-elements";

describe("CommentTotalElements", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentTotalElements totalElements={7} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
