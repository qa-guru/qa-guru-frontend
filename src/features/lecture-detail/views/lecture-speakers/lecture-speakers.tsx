import React from "react";
import { ILectureSpeakers } from "./lecture-speakers.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
  StyledWrapper,
} from "./lecture-speakers.styled";
import UserRow from "../../../../shared/components/user-row";

const LectureSpeakers: React.FC<ILectureSpeakers> = (props) => {
  const { speakers } = props;

  return (
    <>
      <StyledPaper>
        <StyledTypography variant="h5">Спикеры</StyledTypography>
        <StyledWrapper>
          {speakers?.map((item, index) => {
            return (
              <StyledStack key={index}>
                <UserRow user={item!} width={60} height={60} />
              </StyledStack>
            );
          })}
        </StyledWrapper>
      </StyledPaper>
    </>
  );
};

export default LectureSpeakers;
