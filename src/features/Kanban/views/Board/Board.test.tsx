import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./Board";
import { render } from "../../../../test/utilsTest";
import { homeWorksQuery } from "../../../../shared/mocks/homeworks.mock";
import { UserProvider } from "../../context/UserContext";

describe("Board", () => {
  it("Board is render", () => {
    const { asFragment } = render(
      <UserProvider>
        <DndProvider backend={HTML5Backend}>
          <MemoryRouter>
            <Board
              newData={homeWorksQuery}
              inReviewData={homeWorksQuery}
              approvedData={homeWorksQuery}
              notApprovedData={homeWorksQuery}
              fetchMoreFunctions={[() => {}]}
            />
          </MemoryRouter>
        </DndProvider>
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
