import { MemoryRouter } from "react-router-dom";
import SendHomework from "./send-homework";
import { render } from "../../../../../../test/utils-test";

const mockSendHomeWorkToCheck: any = () => {};

describe("SendHomework", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SendHomework
          loading={true}
          sendHomeWorkToCheck={mockSendHomeWorkToCheck}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("the component is not Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SendHomework
          loading={false}
          sendHomeWorkToCheck={mockSendHomeWorkToCheck}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
