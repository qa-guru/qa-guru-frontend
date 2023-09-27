import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { commentsHomeWorkByHomeWork } from "shared/mocks/comments-homework-by-homework.mock";
import { userId } from "shared/mocks/user-id.mock";
import CommentsPagination from "./comments-pagination";

describe("CommentsPagination", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentsPagination
          id="string"
          dataCommentsHomeWorkByHomeWork={commentsHomeWorkByHomeWork}
          fetchMore={() => {}}
          dataUserId={userId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
