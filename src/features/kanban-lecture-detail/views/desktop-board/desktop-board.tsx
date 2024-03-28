import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Maybe, StudentHomeWorkDto } from "api/graphql/generated/graphql";
import useResponsive from "shared/hooks/use-responsive";

import { IDesktopBoard } from "./desktop-board.types";
import {
  StyledColumnBox,
  StyledStack,
  StyledWrapper,
} from "../board/board.styled";
import Column from "../column";
import { ROUTES } from "../../constants";

const DesktopBoard: FC<IDesktopBoard> = ({ columns, fetchMoreFunctions }) => {
  const [activeCardId, setActiveCardId] = useState<Maybe<string>>(null);
  const { isLargeDesktop } = useResponsive();

  const navigate = useNavigate();

  const handleCardClick = (card: StudentHomeWorkDto) => {
    navigate(`${ROUTES.KANBAN}/${card.id}`);
  };

  return (
    <StyledWrapper>
      <StyledColumnBox showHomeworkDetails={false} isUpLg={isLargeDesktop}>
        <StyledStack>
          {columns?.map((column, index) => (
            <Column
              key={`${column.id}-${index}`}
              column={column}
              fetchMore={fetchMoreFunctions[index]}
              onCardClick={handleCardClick}
              activeCardId={activeCardId}
            />
          ))}
        </StyledStack>
      </StyledColumnBox>
    </StyledWrapper>
  );
};

export default DesktopBoard;
