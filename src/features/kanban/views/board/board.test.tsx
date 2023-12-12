import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { render } from "test/utils-test";
import { homeWorksQuery } from "shared/mocks/homeworks.mock";

import Board from "./board";

describe("Board", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
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
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
