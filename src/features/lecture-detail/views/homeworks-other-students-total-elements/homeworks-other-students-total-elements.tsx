import { Typography } from "@mui/material";
import { FC } from "react";
import { HomeWorksByLectureIdTotalElementsQuery } from "api/graphql/generated/graphql";

import { StyledStack } from "./homeworks-other-students-total-elements.styled";

interface IHomeworksOtherStudentsTotalElements {
  data: HomeWorksByLectureIdTotalElementsQuery;
}

const HomeworksOtherStudentsTotalElements: FC<
  IHomeworksOtherStudentsTotalElements
> = ({ data }) => {
  const { totalElements } = data.homeWorksByLectureId!;

  return (
    <StyledStack>
      <Typography variant="h3">
        Домашние работы других студентов ({totalElements})
      </Typography>
    </StyledStack>
  );
};

export default HomeworksOtherStudentsTotalElements;
