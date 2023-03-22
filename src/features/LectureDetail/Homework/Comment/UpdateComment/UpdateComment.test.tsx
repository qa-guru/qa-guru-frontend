import { MemoryRouter } from "react-router-dom";
import UpdateComment from "./UpdateComment";
import { render } from "../../../../../test/utilsTest";

const mockSetSelectedIndex: any = () => {};
const mockUpdateComment: any = () => {};

describe("UpdateComment", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <UpdateComment
          setSelectedIndex={mockSetSelectedIndex}
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
            setSelectedIndex={mockSetSelectedIndex}
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
