import { MemoryRouter } from "react-router-dom";
import CommentTotalElements from "./comment-total-elements";
import { render } from "../../../../test/utils-test";

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
