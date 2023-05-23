import { MemoryRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { render } from "../../../../test/utilsTest";
import { kanbanColumn } from "../../../../shared/mocks/kanbanColumnMock";
import { UserProvider } from "../../context/UserContext";

describe("Column", () => {
  it("items is true", () => {
    const { asFragment } = render(
      <UserProvider>
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
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("items is false", () => {
    const { asFragment } = render(
      <UserProvider>
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
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
