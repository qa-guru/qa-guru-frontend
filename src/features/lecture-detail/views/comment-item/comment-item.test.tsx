import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import { commentHomeWorkDto } from "shared/mocks/comment-homework-dto.mock";

import CommentItem from "./comment-item";

const setSelectedIndex: any = () => {};
describe("CommentItem", () => {
  it("the component is true", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CommentItem
          item={commentHomeWorkDto}
          editAccess={true}
          isSelected={true}
          setSelectedIndex={setSelectedIndex}
          index={0}
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
          setSelectedIndex={setSelectedIndex}
          index={0}
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
          setSelectedIndex={setSelectedIndex}
          index={0}
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
          setSelectedIndex={setSelectedIndex}
          index={0}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
