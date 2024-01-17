import { FC, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";

import { ITrainings } from "./training-purchases.types";
import {
  StyledCardActionArea,
  StyledCourseImg,
  StyledGrid,
  StyledImgBox,
  StyledLink,
  StyledLoadingButton,
  StyledPaper,
  StyledUserBox,
} from "./training-purchases.styled";
import { TrainingCalendar } from "../../containers";
import UserRow from "../../../../shared/components/user-row";

const TrainingPurchases: FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;

  return (
    <Container>
      <Typography variant="h2">Мои курсы</Typography>
      <StyledGrid container spacing={2}>
        {trainingPurchases?.map((item) => {
          const { id, name } = item?.trainingTariff.training || {};
          const [showCalendar, setShowCalendar] = useState(false);

          return (
            <Grid
              item
              key={id}
              xs={12}
              md={6}
              onMouseEnter={() => setShowCalendar(true)}
              onMouseLeave={() => setShowCalendar(false)}
            >
              <StyledLink to={`/training/${id}`}>
                <StyledCardActionArea>
                  <StyledPaper>
                    <StyledImgBox>
                      <StyledCourseImg />
                    </StyledImgBox>
                    <StyledUserBox>
                      <UserRow user={item?.user} />
                    </StyledUserBox>
                    <Typography variant="h5">{name}</Typography>
                    <StyledLoadingButton variant="contained">
                      Продолжить
                    </StyledLoadingButton>
                  </StyledPaper>
                </StyledCardActionArea>
              </StyledLink>
              {showCalendar && <TrainingCalendar />}
            </Grid>
          );
        })}
      </StyledGrid>
    </Container>
  );
};

export default TrainingPurchases;
