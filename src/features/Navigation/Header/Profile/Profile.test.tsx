import { MemoryRouter } from "react-router-dom";
import { render } from "../../../../test/utilsTest";
import Profile from "./Profile";
import { UserQuery } from "../../../../api/graphql/generated/graphql";

const mockData: UserQuery = {
  __typename: "Query",
  user: {
    __typename: "UserDto",
    id: "string",
    email: "string",
    firstName: "string",
    lastName: "string",
    middleName: "string",
    phoneNumber: "string",
    avatarLocation: "string",
    roles: [],
    locked: false,
  },
};

describe("Profile", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Profile data={mockData!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
