import { FC, useEffect, useState } from "react";
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
import { QUERY_DEFAULTS } from "../../constants";
import HomeworkItem from "../homework-item";

const HomeworksOtherStudents: FC<IHomeworksOtherStudents> = (props) => {
  const { data, fetchMore, dataUserId } = props;
  const { items, totalElements } = data?.homeWorksByLectureId || {};
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);

  useEffect(() => {
    if (items && items?.length >= totalElements) {
      setHasMoreHomeworks(false);
    }
  }, [items]);

  const handleLoadMore = () => {
    setLoading(true);
    fetchMore({
      variables: {
        offset: items?.length,
        limit: QUERY_DEFAULTS.LIMIT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          homeWorksByLectureId: {
            ...fetchMoreResult.homeWorksByLectureId,
            items: [
              ...(prev?.homeWorksByLectureId?.items || []),
              ...(fetchMoreResult?.homeWorksByLectureId?.items || []),
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
        <Typography variant="h3">Домашние работы других студентов</Typography>
        <Typography variant="h3">({totalElements})</Typography>
      </StyledStack>
      <StyledWrapper>
        {items?.map((item) => {
          const { id } = item!;

          return (
            <StyledPaper key={id}>
              <HomeworkItem
                dataHomeWorkByLecture={item}
                dataUserId={dataUserId}
              />
              <ModalHomeworksOtherStudents
                key={id}
                item={item}
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
