import { MemoryRouter } from "react-router-dom";
import Comment from "./Comment";
import { render } from "../../../../test/utilsTest";
import { mockDataUser } from "../../../../shared/mocks/dataUser.mock";
import { mockDataCommentsHomeWorkByHomeWork } from "../../../../shared/mocks/dataCommentsHomeWorkByHomeWork.mock";

const mockFetchMoreCommentsHomeWorkByHomeWork: any = () => {};

describe("Comment", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Comment
          id="string"
          dataUser={mockDataUser}
          dataCommentsHomeWorkByHomeWork={mockDataCommentsHomeWorkByHomeWork}
          fetchMore={mockFetchMoreCommentsHomeWorkByHomeWork}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
