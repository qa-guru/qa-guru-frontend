import { MemoryRouter } from "react-router-dom";
import SendComment from "./send-comment";
import { render } from "../../../../test/utils-test";

const mockSendComment: any = () => {};

describe("SendComment", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SendComment loading={true} sendComment={mockSendComment} id={"123"} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    it("the component is not Loading", () => {
      const { asFragment } = render(
        <MemoryRouter>
          <SendComment
            loading={false}
            sendComment={mockSendComment}
            id={"123"}
          />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
