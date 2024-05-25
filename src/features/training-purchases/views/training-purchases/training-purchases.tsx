import { FC, MouseEvent, useState } from "react";
import { Box, Container, Grid, Popover, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserRow from "shared/components/user-row";
import { Maybe } from "api/graphql/generated/graphql";
import CustomLink from "shared/components/custom-link";
import { app } from "theme/colors";

import { ITrainings } from "./training-purchases.types";
import {
  StyledAvatarGroup,
  StyledCardActionArea,
  StyledGrid,
  StyledImgBox,
  StyledLoadingButton,
  StyledTeachersBox,
  StyledPaper,
  StyledUserRowStack,
  StyledLogoBox,
  StyledLogoWhite,
} from "./training-purchases.styled";

const TrainingPurchases: FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLElement>>(null);
  const [openMentorsById, setOpenMentorsById] = useState<string | null>(null);

  const gridMdValue = trainingPurchases?.length! >= 3 ? 4 : 6;

  // const [openCalendarById, setOpenCalendarById] = useState<string | null>(null);
  // const calendarRefs = useRef<{ [key: string]: RefObject<HTMLElement> }>({});

  // const toggleCalendar = (id: string) => {
  //   if (openCalendarById === id) {
  //     setOpenCalendarById(null);
  //   } else {
  //     setOpenCalendarById(id);
  //   }
  // };

  const toggleMentorsMenu = (event: MouseEvent<HTMLElement>, id: string) => {
    if (openMentorsById === id) {
      setOpenMentorsById(null);
      setAnchorEl(null);
    } else {
      setOpenMentorsById(id);
      setAnchorEl(event.currentTarget);
    }
  };

  // trainingPurchases?.forEach((item) => {
  //   const id = item?.trainingTariff.training?.id;
  //   if (id !== undefined) {
  //     if (!calendarRefs.current[id]) {
  //       calendarRefs.current[id] = createRef();
  //     }
  //     useOutsideClick(calendarRefs.current[id], () => {
  //       if (openMentorsById === id) {
  //         setOpenMentorsById(null);
  //       }
  //     });
  //   }
  // });

  return (
    <Container>
      <Typography variant="h2">Мои курсы</Typography>
      <StyledGrid container spacing="30px">
        {trainingPurchases?.map((item) => {
          const { id, name, mentors, picture } =
            item?.trainingTariff.training || {};
          const [firstMentor, ...otherMentors] = mentors || [];

          return (
            <Grid item key={id} xs={12} md={gridMdValue}>
              <StyledCardActionArea>
                <StyledPaper>
                  <StyledImgBox>
                    {picture ? (
                      <Box
                        component="img"
                        sx={{
                          borderRadius: "10px 10px 0 0",
                          width: "100%",
                          height: "175px",
                          objectFit: "cover",
                          marginBottom: "10px",
                        }}
                        alt="Course picture"
                        src={`data:image/png;base64, ${picture}` || ""}
                      />
                    ) : (
                      <StyledLogoBox>
                        <StyledLogoWhite />
                      </StyledLogoBox>
                    )}
                  </StyledImgBox>
                  <StyledUserRowStack>
                    <UserRow
                      user={firstMentor}
                      userId={firstMentor?.id}
                      width="35px"
                      height="35px"
                      hasLink
                    />
                    <StyledAvatarGroup
                      total={otherMentors?.length}
                      max={4}
                      variant="rounded"
                      onClick={(event) => toggleMentorsMenu(event, id!)}
                    >
                      {otherMentors?.map((mentor) => (
                        <UserRow
                          user={mentor}
                          userId={mentor?.id}
                          hideFullName
                          hideRating
                          key={mentor?.id}
                        />
                      ))}
                    </StyledAvatarGroup>
                  </StyledUserRowStack>
                  <Typography variant="h5">{name}</Typography>
                  {/*<StyledCalendarBox open={openCalendarById === id}>*/}
                  {/*  <StyledCalendarIcon*/}
                  {/*    onClick={() => toggleCalendar(id!)}*/}
                  {/*    open={openCalendarById === id}*/}
                  {/*    onMouseDown={(event) => event.stopPropagation()}*/}
                  {/*  />*/}
                  {/*</StyledCalendarBox>*/}
                  {/*{id && (*/}
                  {/*  <Box ref={calendarRefs.current[id]}>*/}
                  {/*    {openCalendarById === id && <TrainingCalendar />}*/}
                  {/*  </Box>*/}
                  {/*)}*/}
                  <StyledLoadingButton variant="contained">
                    <CustomLink path={`/training/${id}`} color={app.white}>
                      Продолжить
                    </CustomLink>
                  </StyledLoadingButton>
                </StyledPaper>
              </StyledCardActionArea>
              <Popover
                open={openMentorsById === id}
                anchorEl={anchorEl}
                onClose={(event: MouseEvent<HTMLElement>) =>
                  toggleMentorsMenu(event, id!)
                }
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <StyledTeachersBox>
                  {mentors?.map((mentor) => (
                    <StyledTeachersBox key={mentor?.id}>
                      <UserRow user={mentor} userId={mentor?.id} hasLink />
                    </StyledTeachersBox>
                  ))}
                </StyledTeachersBox>
              </Popover>
            </Grid>
          );
        })}
      </StyledGrid>
    </Container>
  );
};

export default TrainingPurchases;
