import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { render } from "../../../../test/utilsTest";
import { kanbanColumn } from "../../../../shared/mocks/kanbanColumnMock";

describe("Column", () => {
  it("newItem - true and fromInReview - true", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Column
            column={kanbanColumn}
            onCardDrop={() => {}}
            draggingState={{ newItem: true, fromInReview: true }}
            setDraggingState={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("newItem - true and fromInReview - false", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Column
            column={kanbanColumn}
            onCardDrop={() => {}}
            draggingState={{ newItem: true, fromInReview: false }}
            setDraggingState={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("newItem - false and fromInReview - true", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Column
            column={kanbanColumn}
            onCardDrop={() => {}}
            draggingState={{ newItem: false, fromInReview: true }}
            setDraggingState={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("newItem - false and fromInReview - false", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Column
            column={kanbanColumn}
            onCardDrop={() => {}}
            draggingState={{ newItem: false, fromInReview: false }}
            setDraggingState={() => {}}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
