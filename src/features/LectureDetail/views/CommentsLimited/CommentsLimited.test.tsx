import { MemoryRouter } from "react-router-dom";
import CommentsLimited from "./CommentsLimited";
import { render } from "../../../../test/utilsTest";
import { commentsHomeWorkByHomeWork } from "../../../../shared/mocks/commentsHomeWorkByHomeWork.mock";
import { userId } from "../../../../shared/mocks/userId.mock";

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
