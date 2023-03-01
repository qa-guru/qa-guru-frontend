import { MemoryRouter } from "react-router-dom";
import SendComment from "./SendComment";
import { render } from "../../../../test/utilsTest";

const mockSendComment: any = () => {};
const mockSetAddComment: any = () => {};

describe("SendComment", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SendComment
          loading={true}
          sendComment={mockSendComment}
          setAddComment={mockSetAddComment}
          id={"123"}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
    it("the component is not Loading", () => {
      const { asFragment } = render(
        <MemoryRouter>
          <SendComment
            loading={false}
            sendComment={mockSendComment}
            setAddComment={mockSetAddComment}
            id={"123"}
          />
        </MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
