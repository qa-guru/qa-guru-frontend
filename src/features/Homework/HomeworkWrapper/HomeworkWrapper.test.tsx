import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import HomeworkWrapper from "./HomeworkWrapper";

const mockDataHomeworkStatus: any = {
  __typename: "Query",
  homeWorkByStudentAndLecture: {
    __typename: "StudentHomeWorkDto",
    status: "APPROVED",
  },
};

describe("Homework", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <HomeworkWrapper dataHomeworkStatus={mockDataHomeworkStatus!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
