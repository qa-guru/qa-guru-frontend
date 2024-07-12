import { FC, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeworkItem from "shared/features/homework-item";
import { QUERY_DEFAULTS } from "shared/constants";
import ContentNotFound from "shared/components/content-not-found";
import { ReactComponent as HomeworksNotFound } from "assets/images/homework-not-found.svg";

import { IHomeworksOtherStudents } from "./homeworks-other-students.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledPaper,
  StyledWrapper,
} from "./homework-other-students.styled";
import ModalHomeworksOtherStudents from "../modal-homeworks-other-students";

const HomeworksOtherStudents: FC<IHomeworksOtherStudents> = (props) => {
  const { data, fetchMore } = props;
  const { items, totalElements } = data?.homeWorksByLectureId || {};
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);
  const hasItems = items?.length !== 0;

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

  const renderHomeworks = () => (
    <StyledWrapper>
      {items?.map((item) => {
        const { id } = item!;

        return (
          <StyledPaper key={id}>
            <HomeworkItem dataHomeWorkByLectureAndTraining={item} />
            <ModalHomeworksOtherStudents key={id} item={item} />
          </StyledPaper>
        );
      })}
    </StyledWrapper>
  );

  const renderNotFound = () => (
    <ContentNotFound text="Нет домашних работ" icon={<HomeworksNotFound />} />
  );

  const renderLoadMoreHomeworks = () =>
    hasMoreHomeworks && (
      <Stack>
        <StyledLoadingButton
          loading={loading}
          onClick={handleLoadMore}
          endIcon={<ExpandMoreIcon />}
        >
          Загрузить еще
        </StyledLoadingButton>
      </Stack>
    );

  return (
    <StyledBox>
      {hasItems ? renderHomeworks() : renderNotFound()}
      {renderLoadMoreHomeworks()}
    </StyledBox>
  );
};

export default HomeworksOtherStudents;
