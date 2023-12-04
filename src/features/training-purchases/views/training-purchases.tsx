import { FC } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { ITrainings } from "./training-purchases.types";
import {
  StyledBox,
  StyledCardActionArea,
  StyledGrid,
  StyledLink,
  StyledPaper,
  StyledTypography,
} from "./training-purchases.styled";

const TrainingPurchases: FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;

  return (
    <Container>
      <Typography variant="h2">Мои курсы</Typography>
      <StyledGrid container spacing={2}>
        {trainingPurchases?.map((item, index) => {
          const { id, name } = item?.trainingTariff.training || {};

          return (
            <Grid item key={index} xs={12} md={6}>
              <StyledLink to={`/training/${id}`}>
                <StyledCardActionArea>
                  <StyledPaper>
                    <Typography variant="h5">{name}</Typography>
                    <StyledBox>
                      <StyledTypography variant="body2">
                        Продолжить
                      </StyledTypography>
                    </StyledBox>
                  </StyledPaper>
                </StyledCardActionArea>
              </StyledLink>
            </Grid>
          );
        })}
      </StyledGrid>
    </Container>
  );
};

export default TrainingPurchases;
