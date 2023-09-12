import { MemoryRouter } from "react-router-dom";
import CommentsPagination from "./comments-pagination";
import { render } from "../../../../test/utils-test";
import { commentsHomeWorkByHomeWork } from "../../../../shared/mocks/comments-homework-by-homework.mock";
import { userId } from "../../../../shared/mocks/user-id.mock";

describe("CommentsPagination", () => {
  it("the component is render", () => {
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
