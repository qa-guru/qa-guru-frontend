import { MemoryRouter } from "react-router-dom";
import Comment from "./Comment";
import { render } from "../../../../test/utilsTest";
import { UserQuery } from "../../../../api/graphql/generated/graphql";

const mockSetTotalElements: any = () => {};

const mockFetchMore: any = () => {};

const mockDataCommentsHomeWorkByHomeWork: any = {
  __typename: "Query",
  commentsHomeWorkByHomeWo: {
    __typename: "CommentHomeWorksDto",
    totalPages: 7,
    totalElements: null,
    items: [
      {
        __typename: "CommentHomeWorkDto",
        id: "string",
        creationDate: null,
        content: "string",
        creator: {
          __typename: "UserDto",
          id: "string",
          firstName: "string",
          middleName: "string",
          lastName: "string",
        },
        homeWork: {
          __typename: "StudentHomeWorkDto",
          id: "string",
        },
      },
    ],
  },
};

const mockDateUser: UserQuery = {
  __typename: "Query",
  user: {
    __typename: "UserDto",
    id: "1234",
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

describe("Comment", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Comment
          id="string"
          dataUser={mockDateUser}
          dataCommentsHomeWorkByHomeWork={mockDataCommentsHomeWorkByHomeWork}
          fetchMore={mockFetchMore}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
