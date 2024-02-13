import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";

import UpdateComment from "./update-comment";

const mockUpdateComment: any = () => {};

describe("UpdateComment", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateComment
          id={"12312"}
          updateComment={mockUpdateComment}
          loading={true}
          content={"Hello"}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    it("the component is not Loading", () => {
      const { asFragment } = render(
        <MemoryRouter>
          <UpdateComment
            id={"12312"}
            updateComment={mockUpdateComment}
            loading={false}
            content={"Hello"}
          />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
