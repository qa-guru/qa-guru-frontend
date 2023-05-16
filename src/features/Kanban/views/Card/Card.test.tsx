import { MemoryRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Card from "./Card";
import { render } from "../../../../test/utilsTest";
import { studentHomeWorkDto } from "../../../../shared/mocks/studentHomeWorkDto.mock";

describe("Card", () => {
  it("Card is visible", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Card
            card={studentHomeWorkDto}
            sourceColumnId="column-1"
            setDraggingState={() => {}}
            isCardsHidden={false}
            userId={"123"}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("Card is hidden", () => {
    const { asFragment } = render(
      <DndProvider backend={HTML5Backend}>
        <MemoryRouter>
          <Card
            card={studentHomeWorkDto}
            sourceColumnId="column-1"
            setDraggingState={() => {}}
            isCardsHidden={true}
            userId={"123"}
          />
        </MemoryRouter>
      </DndProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
