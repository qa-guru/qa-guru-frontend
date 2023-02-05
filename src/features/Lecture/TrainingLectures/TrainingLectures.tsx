import React from "react";
import { CardActionArea, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ITrainingLectures } from "./TrainingLectures.types";

const TrainingLectures: React.FC<ITrainingLectures> = ({
  data,
  trainingId,
}) => {
  return (
    <Grid container spacing={2}>
      {data?.trainingLectures?.map((item, index) => {
        const arrayDescriptionItem = item?.lecture?.description?.split("\n");

        return (
          <Grid item xs={12} key={index}>
            <Link
              style={{ textDecoration: "none", marginTop: "15px" }}
              to={`/training/${trainingId}/${item?.lecture?.id}`}
            >
              <CardActionArea>
                <Paper style={{ padding: "24px 24px 15px 24px" }}>
                  <Typography variant="h3">{item?.lecture?.subject}</Typography>
                  <Stack spacing={1.5}>
                    {arrayDescriptionItem?.map((item, index) => {
                      return (
                        <Typography key={index} variant="subtitle2" mt="16px">
                          {item}
                        </Typography>
                      );
                    })}
                  </Stack>
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
