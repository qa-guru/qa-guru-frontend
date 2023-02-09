import { MemoryRouter } from "react-router-dom";
import { render } from "../../../../test/utilsTest";
import LectureSpeakers from "./LectureSpeakers";

const mockSpeakers: any = [
  {
    __typename: "UserDto",
    id: "string",
    firstName: "string",
    lastName: "string",
    middleName: "string",
  },
];

describe("LectureSpeakers", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LectureSpeakers speakers={mockSpeakers!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
