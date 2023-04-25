import { MemoryRouter } from "react-router-dom";
import TrainingLectures from "./TrainingLectures";
import { render } from "../../../test/utilsTest";
import { trainingLectures } from "../../../shared/mocks/trainingLectures.mock";
import { training } from "../../../shared/mocks/training.mock";

describe("TrainingLectures", () => {
  it("the component is render", () => {
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
