import React from "react";
import { CardActionArea, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ITrainingLectures } from "./TrainingLectures.types";

const style = {
  link: { textDecoration: "none", marginTop: "15px" },
  paper: { padding: "24px 24px 15px 24px" },
};

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
              style={style.link}
              to={`/training/${trainingId}/${item?.lecture?.id}`}
            >
              <CardActionArea>
                <Paper sx={style.paper}>
                  <Typography variant="h6">{item?.lecture?.subject}</Typography>
                  <Stack spacing={1.5}>
                    {arrayDescriptionItem?.map((item, index) => {
                      return (
                        <Typography key={index} variant="subtitle1" mt="16px">
                          {item}
                        </Typography>
                      );
                    })}
                  </Stack>
                  <Typography color="primary" variant="subtitle2" align="right">
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
