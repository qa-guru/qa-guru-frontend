import { FC, MouseEvent, useState } from "react";
import { Container, Grid, Popover, Tooltip, Typography } from "@mui/material";

import UserRow from "shared/components/user-row";
import { Maybe, UserDto } from "api/graphql/generated/graphql";
import CustomLink from "shared/components/custom-link";

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
  StyledInnerBox,
} from "./training-purchases.styled";

const TrainingPurchases: FC<ITrainings> = ({ data }) => {
  const { trainingPurchases } = data;
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLElement>>(null);
  const [openMentorsById, setOpenMentorsById] = useState<string | null>(null);

  const gridValue = trainingPurchases?.length! >= 3 ? 4 : 6;

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

  const renderMentorsPopover = (
    id?: string,
    mentors?: Maybe<Array<Maybe<UserDto>>>
  ) => (
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
  );

  const renderCourseImage = (picture?: Maybe<string>) =>
    picture ? (
      <StyledInnerBox
        component="img"
        alt="Course picture"
        src={`data:image/png;base64, ${picture}` || ""}
      />
    ) : (
      <StyledLogoBox>
        <StyledLogoWhite />
      </StyledLogoBox>
    );

  return (
    <Container>
      <Typography variant="h2">Мои курсы</Typography>
      <StyledGrid container spacing="30px">
        {trainingPurchases?.map((item) => {
          const { id, name, mentors, picture } =
            item?.trainingTariff.training || {};
          const [firstMentor, ...otherMentors] = mentors || [];

          return (
            <Grid item key={id} xs={12} md={6} lg={gridValue}>
              <StyledCardActionArea>
                <StyledPaper>
                  <StyledImgBox>{renderCourseImage(picture)}</StyledImgBox>
                  <StyledUserRowStack>
                    <UserRow
                      user={firstMentor}
                      userId={firstMentor?.id}
                      width="35px"
                      height="35px"
                      hasLink
                    />
                    <Tooltip title="Преподаватели">
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
                    </Tooltip>
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
                  <CustomLink path={`/training/${id}`}>
                    <StyledLoadingButton variant="contained">
                      Продолжить
                    </StyledLoadingButton>
                  </CustomLink>
                </StyledPaper>
              </StyledCardActionArea>
              {renderMentorsPopover(id, mentors)}
            </Grid>
          );
        })}
      </StyledGrid>
    </Container>
  );
};

export default TrainingPurchases;
