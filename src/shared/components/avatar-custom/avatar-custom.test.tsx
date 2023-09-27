import { MemoryRouter } from "react-router-dom";
import { render } from "test/utils-test";
import AvatarCustom from "./avatar-custom";

describe("AvatarCustom", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AvatarCustom
          fullName="John Doe"
          width={40}
          height={40}
          variant="subtitle2"
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
