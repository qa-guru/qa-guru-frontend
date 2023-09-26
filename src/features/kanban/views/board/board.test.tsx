import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./board";
import { render } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/test/utils-test";
import { homeWorksQuery } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/shared/mocks/homeworks.mock";
import { UserProvider } from "../../context/user-context";

describe("Board", () => {
  it("renders correctly", () => {
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
