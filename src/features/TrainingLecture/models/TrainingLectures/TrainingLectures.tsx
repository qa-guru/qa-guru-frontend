import React from "react";
import { Box, CardActionArea, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./TrainingLectures.module.scss";
import { TrainingLecturesQuery } from "../../../../generated/graphql";

interface ITrainingLectures {
  data: TrainingLecturesQuery;
  trainingId: string;
}

const TrainingLectures: React.FC<ITrainingLectures> = ({
  data,
  trainingId,
}) => {
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

export default TrainingLectures;
