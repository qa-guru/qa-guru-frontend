import { MemoryRouter } from "react-router-dom";
import SendHomeworkItem from "./SendHomeworkItem";
import { render } from "../../../../test/utilsTest";

const mockSendHomeWorkToCheck: any = () => {};

describe("SendHomeworkItem", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SendHomeworkItem
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
        <SendHomeworkItem
          loading={false}
          sendHomeWorkToCheck={mockSendHomeWorkToCheck}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
