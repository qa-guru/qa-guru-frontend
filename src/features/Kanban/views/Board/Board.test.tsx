import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./Board";
import { render } from "../../../../test/utilsTest";
import { homeWorksQuery } from "../../../../shared/mocks/homeworks.mock";

describe("Board", () => {
  it("Board is render", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Board data={homeWorksQuery!} />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
