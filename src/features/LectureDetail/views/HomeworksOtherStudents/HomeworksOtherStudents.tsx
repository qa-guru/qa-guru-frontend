import React, { useEffect, useState } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IHomeworksOtherStudents } from "./HomeworksOtherStudents.types";
import { style } from "./styles";
import ModalHomeworksOtherStudents from "../ModalHomeworksOtherStudents";
import HomeworkItem from "../HomeworkItem";

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
      },
      updateQuery: (
        prev: { homeWorksByLectureId: { items: any } },
        { fetchMoreResult }: any
      ) => {
        if (!fetchMoreResult) return prev;
        return {
          homeWorksByLectureId: {
            ...fetchMoreResult.homeWorksByLectureId,
            items: [
              ...prev.homeWorksByLectureId.items,
              ...fetchMoreResult.homeWorksByLectureId.items,
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
      <Stack my={3} pt={3} spacing={1} direction="row">
        <Typography variant="h4">Домашние работы других студентов</Typography>
        <Typography variant="h4">({totalElements})</Typography>
      </Stack>
      <Stack spacing={2}>
        {items?.map((item, index) => {
          return (
            <Paper key={index} sx={style.paper}>
              <HomeworkItem
                dataHomeWorkByLecture={item!}
                dataUserId={dataUserId}
              />
              <ModalHomeworksOtherStudents
                key={index}
                item={item!}
                dataUserId={dataUserId}
              />
            </Paper>
          );
        })}
      </Stack>
      {hasMoreHomeworks && (
        <Stack mt="15px">
          <LoadingButton
            loading={loading}
            onClick={handleLoadMore}
            sx={style.loadMoreBtn}
            endIcon={<ExpandMoreIcon />}
          >
            Загрузить еще
          </LoadingButton>
        </Stack>
      )}
    </>
  );
};

export default HomeworksOtherStudents;
