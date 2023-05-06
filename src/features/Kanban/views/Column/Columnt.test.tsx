import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { render } from "../../../../test/utilsTest";
import { kanbanColumn } from "../../../../shared/mocks/kanbanColumnMock";

describe("Column", () => {
  it("items is true", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Column
            column={kanbanColumn}
            onCardDrop={() => {}}
            draggingState={{
              newItem: true,
              fromInReview: true,
              fromNotApproved: true,
            }}
            setDraggingState={() => {}}
            fetchMore={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("items is false", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Column
            column={kanbanColumn}
            onCardDrop={() => {}}
            draggingState={{
              newItem: false,
              fromInReview: false,
              fromNotApproved: false,
            }}
            setDraggingState={() => {}}
            fetchMore={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
