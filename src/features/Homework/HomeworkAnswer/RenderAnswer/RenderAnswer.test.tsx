import { MemoryRouter } from "react-router-dom";
import { render } from "../../../../test/utilsTest";
import RenderAnswer from "./RenderAnswer";

describe("HomeworkAnswer", () => {
  it("the component is render", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <RenderAnswer answer={"answer"} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
