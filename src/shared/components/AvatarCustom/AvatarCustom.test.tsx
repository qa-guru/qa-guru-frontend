import { MemoryRouter } from "react-router-dom";
import AvatarCustom from "./AvatarCustom";
import { render } from "../../../test/utilsTest";

describe("AvatarCustom", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AvatarCustom
          fullName="testDate"
          width={40}
          height={40}
          variant="subtitle2"
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
