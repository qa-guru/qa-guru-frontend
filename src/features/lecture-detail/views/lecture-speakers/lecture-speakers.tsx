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
        <StyledTypography variant="h5">Преподаватели</StyledTypography>
        <StyledWrapper>
          {speakers?.map((item) => {
            const { id } = item!;

            return (
              <StyledStack key={id}>
                <UserRow user={item} width={40} height={40} userId={id} />
              </StyledStack>
            );
          })}
        </StyledWrapper>
      </StyledPaper>
    </>
  );
};

export default LectureSpeakers;
