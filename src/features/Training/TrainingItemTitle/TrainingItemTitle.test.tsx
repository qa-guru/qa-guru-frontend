import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import TrainingItemTitle from "./TrainingItemTitle";
import { TechStack } from "../../../generated/graphql";

const mockData: any = {
  __typename: "Query",
  training: {
    __typename: "TrainingDto",
    id: "string",
    name: "string",
    content: "string",
    techStack: TechStack,
    tariffs: [
      {
        __typename: "TrainingTariffDto",
        id: "string",
        name: "string",
        code: "string",
        price: "number",
        homeWork: true,
        description: "string",
      },
    ],
    mentors: [
      {
        __typename: "UserDto",
        id: "string",
        firstName: "string",
        lastName: "string",
        middleName: "string",
      },
    ],
  },
};

describe("TrainingItemTitle", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingItemTitle data={mockData!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
