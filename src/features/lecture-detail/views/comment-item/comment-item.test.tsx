import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { commentHomeWorkDto } from "shared/mocks/comment-homework-dto.mock";

import CommentItem from "./comment-item";

const mockSetSelectedComment: any = () => {};
describe("CommentItem", () => {
  it("the component is true", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentItem
          item={commentHomeWorkDto}
          editAccess={true}
          isSelected={true}
          setSelectedComment={mockSetSelectedComment}
          commentId={"0"}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is false", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentItem
          item={commentHomeWorkDto}
          editAccess={false}
          isSelected={false}
          setSelectedComment={mockSetSelectedComment}
          commentId={"1"}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("editAccess - true, isSelected - false", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentItem
          item={commentHomeWorkDto}
          editAccess={true}
          isSelected={false}
          setSelectedComment={mockSetSelectedComment}
          commentId={"2"}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("editAccess - false, isSelected - true", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentItem
          item={commentHomeWorkDto}
          editAccess={false}
          isSelected={true}
          setSelectedComment={mockSetSelectedComment}
          commentId={"3"}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
