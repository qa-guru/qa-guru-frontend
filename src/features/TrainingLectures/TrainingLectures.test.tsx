import { MemoryRouter } from "react-router-dom";
import TrainingLectures from "./TrainingLectures";
import { render } from "../../test/utilsTest";
import { TrainingLecturesQuery } from "../../api/graphql/generated/graphql";

const mockDataTrainingLectures: TrainingLecturesQuery = {
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
        description: ["string1", "string1"],
      },
      lastLecture: {
        __typename: "LectureDto",
        id: "string",
        subject: "string",
        description: ["string1", "string1"],
      },
    },
  ],
};

const mockDataTraining: any = {
  __typename: "Query",
  training: {
    __typename: "TrainingDto",
    id: "string",
    name: "string",
    content: "string",
    techStack: null,
    tariffs: [
      {
        __typename: "TrainingTariffDto",
        id: "string",
        name: "string",
        code: "string",
        price: 7,
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
        middleName: "",
      },
    ],
  },
};

const mockTrainingId: string = "string";

describe("TrainingLectures", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingLectures
          trainingId={mockTrainingId!}
          dataTrainingLectures={mockDataTrainingLectures}
          dataTraining={mockDataTraining}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
