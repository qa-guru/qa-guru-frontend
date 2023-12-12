import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { kanbanColumn } from "shared/mocks/kanban-column.mock";
import { render } from "test/utils-test";

import Column from "./column";

describe("Column", () => {
  it("items are true", () => {
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
            onCardClick={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("items are false", () => {
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
            onCardClick={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
