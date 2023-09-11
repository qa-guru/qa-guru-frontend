import { MemoryRouter } from "react-router-dom";
import CommentsPagination from "./CommentsPagination";
import { render } from "../../../../test/utilsTest";
import { commentsHomeWorkByHomeWork } from "../../../../shared/mocks/commentsHomeWorkByHomeWork.mock";
import { userId } from "../../../../shared/mocks/userId.mock";

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
