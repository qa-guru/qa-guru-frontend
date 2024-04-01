import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentHomeWorkDto } from "api/graphql/generated/graphql";
import { Box } from "@mui/material";

import { IDesktopBoard } from "./desktop-board.types";
import {
  StyledColumnBox,
  StyledStack,
  StyledWrapper,
} from "../board/board.styled";
import Column from "../column";
import { ROUTES } from "../../constants";

const DesktopBoard: FC<IDesktopBoard> = ({ columns, fetchMoreFunctions }) => {
  const navigate = useNavigate();

  const handleCardClick = (card: StudentHomeWorkDto) => {
    navigate(`${ROUTES.KANBAN}/${card.id}`);
  };

  return (
    <StyledWrapper>
      <StyledColumnBox>
        <StyledStack>
          {columns?.map((column, index) => (
            <Column
              key={`${column.id}-${index}`}
              column={column}
              fetchMore={fetchMoreFunctions[index]}
              onCardClick={handleCardClick}
            />
          ))}
        </StyledStack>
      </StyledColumnBox>
    </StyledWrapper>
  );
};

export default DesktopBoard;
