import { MemoryRouter } from "react-router-dom";
import { render } from "../../../test/utilsTest";
import TrainingLectures from "./TrainingLectures";
import { TrainingLecturesQuery } from "../../../generated/graphql";

const mockData: TrainingLecturesQuery = {
  __typename: "Query",
  trainingLectures: [
    {
      __typename: "TrainingLectureDto",
      id: "string",
      number: 7,
      locking: false,
      lecture: {
        __typename: "LectureDto",
        id: "string",
        subject: "string",
        description: "string",
      },
      lastLecture: {
        __typename: "LectureDto",
        id: "string",
        subject: "string",
        description: "string",
      },
    },
  ],
};

const mockTrainingId: string = "string";

describe("TrainingLectures", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingLectures trainingId={mockTrainingId!} data={mockData!} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
