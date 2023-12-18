import { MemoryRouter } from "react-router-dom";
import { trainingLectures } from "shared/mocks/training-lectures.mock";
import { training } from "shared/mocks/training.mock";

import TrainingLectures from "../training-lectures";
import { render } from "../../../../test/utils-test";

describe("TrainingLectures", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <TrainingLectures
          trainingId="1234"
          dataTrainingLectures={trainingLectures}
          dataTraining={training}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
