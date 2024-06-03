import { FC } from "react";

import { IDesktopBoard } from "./desktop-board.types";
import {
  StyledColumnBox,
  StyledStack,
  StyledWrapper,
} from "../board/board.styled";
import Column from "../column";

const DesktopBoard: FC<IDesktopBoard> = ({ columns, fetchMoreFunctions }) => {
  return (
    <StyledWrapper>
      <StyledColumnBox>
        <StyledStack>
          {columns?.map((column, index) => (
            <Column
              key={`${column.id}-${index}`}
              column={column}
              fetchMore={fetchMoreFunctions[index]}
            />
          ))}
        </StyledStack>
      </StyledColumnBox>
    </StyledWrapper>
  );
};

export default DesktopBoard;
