import { MemoryRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Card from "./Card";
import { render } from "../../../../test/utilsTest";
import { studentHomeWorkDto } from "../../../../shared/mocks/studentHomeWorkDto.mock";
import { UserProvider } from "../../context/UserContext";

describe("Card", () => {
  it("Card is visible", () => {
    const { asFragment } = render(
      <UserProvider>
        <DndProvider backend={HTML5Backend}>
          <MemoryRouter>
            <Card
              card={studentHomeWorkDto}
              sourceColumnId="column-1"
              setDraggingState={() => {}}
              isCardsHidden={false}
            />
          </MemoryRouter>
        </DndProvider>
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("Card is hidden", () => {
    const { asFragment } = render(
      <UserProvider>
        <DndProvider backend={HTML5Backend}>
          <MemoryRouter>
            <Card
              card={studentHomeWorkDto}
              sourceColumnId="column-1"
              setDraggingState={() => {}}
              isCardsHidden={true}
            />
          </MemoryRouter>
        </DndProvider>
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
