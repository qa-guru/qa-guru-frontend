import { FC } from "react";
import UserRow from "shared/components/user-row";
import { ILectureSpeakers } from "./lecture-speakers.types";
import {
  StyledPaper,
  StyledStack,
  StyledTypography,
  StyledWrapper,
} from "./lecture-speakers.styled";

const LectureSpeakers: FC<ILectureSpeakers> = (props) => {
  const { speakers } = props;

  return (
    <>
      <StyledPaper>
        <StyledTypography variant="h5">Спикеры</StyledTypography>
        <StyledWrapper>
          {speakers?.map((item, index) => {
            return (
              <StyledStack key={index}>
                <UserRow user={item} width={60} height={60} />
              </StyledStack>
            );
          })}
        </StyledWrapper>
      </StyledPaper>
    </>
  );
};

export default LectureSpeakers;
