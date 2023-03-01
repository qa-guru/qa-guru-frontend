import { MemoryRouter } from "react-router-dom";
import Comment from "./Comment";
import { render } from "../../../../test/utilsTest";

const mockSetTotalElements: any = () => {};

const mockData: any = {
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

describe("Comment", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Comment setTotalElements={mockSetTotalElements} data={mockData} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
