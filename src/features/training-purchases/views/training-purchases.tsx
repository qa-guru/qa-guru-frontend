import { FC, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ITrainings } from "./training-purchases.types";
import {
  StyledBox,
  StyledCardActionArea,
  StyledGrid,
  StyledLink,
  StyledPaper,
  StyledTypography,
} from "./training-purchases.styled";
import { white } from "../../../theme/colors";

const TrainingPurchases: FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <Container>
      <Typography variant="h2">Мои курсы</Typography>
      <StyledGrid container spacing={2} sx={{ position: "relative" }}>
        {trainingPurchases?.map((item, index) => {
          const { id, name } = item?.trainingTariff.training || {};

          return (
            <Grid
              item
              key={index}
              xs={12}
              md={6}
              onMouseEnter={() => setShowCalendar(true)}
              onMouseLeave={() => setShowCalendar(false)}
            >
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
              {showCalendar && (
                <Box
                  onMouseEnter={() => setShowCalendar(true)}
                  onMouseLeave={() => setShowCalendar(false)}
                  sx={{ position: "absolute", backgroundColor: white }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                  </LocalizationProvider>
                </Box>
              )}
            </Grid>
          );
        })}
      </StyledGrid>
    </Container>
  );
};

export default TrainingPurchases;
