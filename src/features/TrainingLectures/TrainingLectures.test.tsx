import { MemoryRouter } from "react-router-dom";
import TrainingLectures from "./TrainingLectures";
import { render } from "../../test/utilsTest";
import { mockDataTrainingLectures } from "../../shared/mocks/dataTrainingLectures.mock";
import { mockDataTraining } from "../../shared/mocks/dataTraining.mock";

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
