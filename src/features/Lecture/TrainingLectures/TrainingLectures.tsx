import React from "react";
import { CardActionArea, Grid, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./TrainingLectures.module.scss";
import { TrainingLecturesQuery } from "../../../generated/graphql";

interface ITrainingLectures {
  data: TrainingLecturesQuery;
  trainingId: string;
}

const TrainingLectures: React.FC<ITrainingLectures> = ({
  data,
  trainingId,
}) => {
  return (
    <Grid container spacing={2}>
      {data?.trainingLectures?.map((item, index) => {
        return (
          <Grid item xs={12} key={index}>
            <Link
              className={styles.link}
              to={`/training/${trainingId}/${item?.lecture?.id}`}
            >
              <CardActionArea>
                <Paper className={styles.paper}>
                  <Typography variant="h3">{item?.lecture?.subject}</Typography>
                  <Typography variant="subtitle2" mt="16px">
                    {item?.lecture?.description}
                  </Typography>
                  <Typography color="primary" variant="h4" align="right">
                    Продолжить
                  </Typography>
                </Paper>
              </CardActionArea>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TrainingLectures;
