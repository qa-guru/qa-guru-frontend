import { MemoryRouter } from "react-router-dom";
import CommentsPagination from "./CommentsPagination";
import { render } from "../../../../../test/utilsTest";
import { commentsHomeWorkByHomeWork } from "../../../../../shared/mocks/commentsHomeWorkByHomeWork.mock";
import { userId } from "../../../../../shared/mocks/userId.mock";

const mockFetchMoreCommentsHomeWorkByHomeWork: any = () => {};

describe("CommentsPagination", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentsPagination
          id="string"
          dataCommentsHomeWorkByHomeWork={commentsHomeWorkByHomeWork}
          fetchMore={mockFetchMoreCommentsHomeWorkByHomeWork}
          dataUserId={userId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
