import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { commentsHomeWorkByHomeWork } from "shared/mocks/comments-homework-by-homework.mock";
import { userId } from "shared/mocks/user-id.mock";

import CommentsLimited from "./comments-limited";

describe("CommentsLimited", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentsLimited
          id="string"
          dataCommentsHomeWorkByHomeWork={commentsHomeWorkByHomeWork}
          dataUserId={userId}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
