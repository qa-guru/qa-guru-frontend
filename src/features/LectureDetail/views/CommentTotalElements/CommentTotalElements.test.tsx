import { MemoryRouter } from "react-router-dom";
import CommentTotalElements from "./CommentTotalElements";
import { render } from "../../../../test/utilsTest";

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
