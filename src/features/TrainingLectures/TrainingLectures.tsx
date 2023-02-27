import React from "react";
import { CardActionArea, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ITrainingLectures } from "./TrainingLectures.types";
import { primary, white } from "../../theme/colors";

const style = {
  link: { textDecoration: "none" },
  paper: { padding: "24px 24px 15px 24px" },
  circle: {
    minWidth: "40px",
    height: "40px",
    bgcolor: primary.main,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: white.main,
  },
};

const TrainingLectures: React.FC<ITrainingLectures> = (props) => {
  const { dataTrainingLectures, trainingId, dataTraining } = props;
  const { trainingLectures } = dataTrainingLectures;
  const { name } = dataTraining.training!;

  return (
    <>
      <Typography mb="20px" variant="h4">
        {name}
      </Typography>
      <Grid container spacing={2}>
        {trainingLectures?.map((item, index) => {
          const { id, subject, description } = item!.lecture!;

          return (
            <Grid item xs={12} key={index}>
              <Link style={style.link} to={`/training/${trainingId}/${id}`}>
                <CardActionArea>
                  <Paper sx={style.paper}>
                    <Typography variant="h6">{subject}</Typography>
                    <Stack spacing={1.5}>
                      {description?.map((value, index) => {
                        return (
                          <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            key={index}
                            mt="16px"
                          >
                            <Typography sx={style.circle} variant="subtitle2">
                              {index + 1}
                            </Typography>
                            <Typography variant="subtitle1">{value}</Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                    <Typography
                      color="primary"
                      variant="subtitle2"
                      align="right"
                    >
                      Продолжить
                    </Typography>
                  </Paper>
                </CardActionArea>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TrainingLectures;
