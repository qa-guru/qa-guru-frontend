import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import SendHomeWorkToCheck from "./SendHomeWorkToCheck";

const mockSendHomeWorkToCheck: any = () => {};

describe("SendHomeWorkToCheck", () => {
  it("the component is Loading", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SendHomeWorkToCheck
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
        <SendHomeWorkToCheck
          loading={false}
          sendHomeWorkToCheck={mockSendHomeWorkToCheck}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
