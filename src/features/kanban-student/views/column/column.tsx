import { FC } from "react";
import { useTheme } from "@mui/material/styles";
import ColumnContent from "shared/components/column-content/column-content";

import { IColumn } from "./column.types";
import { StyledCardBox } from "./column.styled";
import Card from "../card";
import { getColumnStyles } from "../../helpers/get-column-styles";

const Column: FC<IColumn> = ({
  column,
  fetchMore,
  onCardClick,
  activeCardId,
}) => {
  const theme = useTheme();
  const columnStyles = {
    ...getColumnStyles(column.totalElements),
    height: "calc(100vh - 199px)",
    [theme.breakpoints.only("sm")]: {
      height: "calc(100dvh - 210px)",
    },
    [theme.breakpoints.only("xs")]: {
      height: "calc(100dvh - 178px)",
    },
  };

  return (
    <ColumnContent
      column={column}
      fetchMore={fetchMore}
      columnStyles={columnStyles}
    >
      {column.cards?.map((card, index) => (
        <StyledCardBox key={`${card.id}-${index}`}>
          <Card
            card={card}
            onCardClick={(event) => onCardClick?.(card, event)}
            isActive={activeCardId === card.id}
          />
        </StyledCardBox>
      ))}
    </ColumnContent>
  );
};

export default Column;
