import React, { Fragment, useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IHomeworksOtherStudents } from "./HomeworksOtherStudents.types";
import Homework from "../Homework";
import { primary } from "../../../theme/colors";

const style = {
  loadMoreBtn: { color: primary.main, margin: "0 auto" },
};

const HomeworksOtherStudents: React.FC<IHomeworksOtherStudents> = (props) => {
  const { data, fetchMore, dataUser } = props;
  const { id: idUser } = dataUser.user!;
  const { items, offset, totalElements, limit } = data.homeWorksByLectureId!;
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMoreHomeworks, setHasMoreHomeworks] = useState<boolean>(true);

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
    }).then(() => setLoading(false));
  };

  useEffect(() => {
    if (items?.length! >= totalElements) {
      setHasMoreHomeworks(false);
    }
  }, [items]);

  return (
    <>
      <Stack mb="15px" pt="30px" spacing={1} direction="row">
        <Typography variant="h4">
          Проверенные домашние работы других студентов
        </Typography>
        <Typography variant="h4">({totalElements})</Typography>
      </Stack>
      <Stack spacing={2}>
        {items?.map((item, index) => {
          const { student } = item!;
          const editAccess = idUser === student?.id;

          return (
            <Fragment key={index}>
              <Homework editAccess={editAccess} dataHomeWorkByLecture={item!} />
            </Fragment>
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
