import { MemoryRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Card from "./card";
import { render } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/test/utils-test";
import { studentHomeWorkDto } from "../../../../../../../../Downloads/qa-guru-frontend-develop 2/src/shared/mocks/student-homework-dto.mock";
import { UserProvider } from "../../context/user-context";

describe("Card", () => {
  it("card is visible", () => {
    const { asFragment } = render(
      <UserProvider>
        <DndProvider backend={HTML5Backend}>
          <MemoryRouter>
            <Card
              card={studentHomeWorkDto}
              sourceColumnId="column-1"
              setDraggingState={() => {}}
              isCardsHidden={false}
              onCardClick={() => {}}
            />
          </MemoryRouter>
        </DndProvider>
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("card is hidden", () => {
    const { asFragment } = render(
      <UserProvider>
        <DndProvider backend={HTML5Backend}>
          <MemoryRouter>
            <Card
              card={studentHomeWorkDto}
              sourceColumnId="column-1"
              setDraggingState={() => {}}
              isCardsHidden={true}
              onCardClick={() => {}}
            />
          </MemoryRouter>
        </DndProvider>
      </UserProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
