import React from "react";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { Box, CardActionArea, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useTrainingLecturesQuery } from "../../../../api/graphql/trainingLecture/trainingLectures";
import styles from "./GetTrainingLectures.module.scss";

const GetTrainingLectures: React.FC = () => {
  const { trainingId } = useParams();

  const { data, loading } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box className={styles.box}>
      {data?.trainingLectures?.map((item, index) => {
        return (
          <Link
            className={styles.link}
            key={index}
            to={`/training/${trainingId}/${item?.lecture?.id}`}
          >
            <CardActionArea>
              <Paper className={styles.paper}>
                <Typography className={styles.title}>
                  {item?.lecture?.subject}
                </Typography>
                <Typography className={styles.description}>
                  {item?.lecture?.description}
                </Typography>
              </Paper>
            </CardActionArea>
          </Link>
        );
      })}
    </Box>
  );
};

export default GetTrainingLectures;
