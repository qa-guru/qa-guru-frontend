import React, { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IHomeworksOtherStudents } from "./homeworks-other-students.types";
import {
  StyledLoadingButton,
  StyledPaper,
  StyledStack,
  StyledWrapper,
} from "./homework-other-students.styled";
import ModalHomeworksOtherStudents from "../modal-homeworks-other-students";
import HomeworkItem from "../homework-item";

const HomeworksOtherStudents: React.FC<IHomeworksOtherStudents> = (props) => {
  const { data, fetchMore, dataUserId } = props;
  const { items, offset, totalElements, limit } = data.homeWorksByLectureId!;
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);

  useEffect(() => {
    if (items?.length! >= totalElements) {
      setHasMoreHomeworks(false);
    }
  }, [items]);

  const handleLoadMore = () => {
    setLoading(true);
    fetchMore({
      variables: {
        offset: items?.length,
        limit: 3,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          homeWorksByLectureId: {
            ...fetchMoreResult.homeWorksByLectureId,
            items: [
              ...prev.homeWorksByLectureId!.items!,
              ...fetchMoreResult.homeWorksByLectureId!.items!,
            ],
          },
        };
      },
    }).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <StyledStack>
        <Typography variant="h4">Домашние работы других студентов</Typography>
        <Typography variant="h4">({totalElements})</Typography>
      </StyledStack>
      <StyledWrapper>
        {items?.map((item, index) => {
          return (
            <StyledPaper key={index}>
              <HomeworkItem
                dataHomeWorkByLecture={item!}
                dataUserId={dataUserId}
              />
              <ModalHomeworksOtherStudents
                key={index}
                item={item!}
                dataUserId={dataUserId}
              />
            </StyledPaper>
          );
        })}
      </StyledWrapper>
      {hasMoreHomeworks && (
        <Stack>
          <StyledLoadingButton
            loading={loading}
            onClick={handleLoadMore}
            endIcon={<ExpandMoreIcon />}
          >
            Загрузить еще
          </StyledLoadingButton>
        </Stack>
      )}
    </>
  );
};

export default HomeworksOtherStudents;
