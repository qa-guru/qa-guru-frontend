import { FC, useState } from "react";
import { Divider, Typography } from "@mui/material";
import { useReactiveVar } from "@apollo/client";

import { userIdVar } from "cache";
import StatusText from "shared/components/status-text";
import UserRow from "shared/components/user-row";
import LectureTestSection from "features/lecture-detail/views/lecture-test-section";

import { IHomeworkItem } from "./homework-item.types";
import {
  StyledBox,
  StyledHomeworkContentBox,
  StyledStack,
  StyledUserRowBox,
  StyledWrapper,
} from "./homework-item.styled";
import HomeworkContent from "../homework-content";
import ButtonEdit from "../../components/button-edit";

const HomeworkItem: FC<IHomeworkItem> = (props) => {
  const {
    dataHomeWorkByLectureAndTraining,
    hideMentorAndStudent,
    testGroup,
    trainingId,
    lectureId,
  } = props;
  const {
    status,
    startCheckingDate,
    endCheckingDate,
    mentor,
    student,
    answer,
    id: homeWorkId,
  } = dataHomeWorkByLectureAndTraining || {};

  const currentUserId = useReactiveVar(userIdVar);
  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<boolean>(false);
  const editAccess = currentUserId === student?.id;

  const date = status === "IN_REVIEW" ? startCheckingDate : endCheckingDate;

  const renderStatusAndMentor = () =>
    !hideMentorAndStudent && (
      <>
        <StatusText status={status} />
        <StyledStack>
          {status &&
            ["NOT_APPROVED", "APPROVED", "IN_REVIEW"].includes(status) && (
              <StyledBox>
                <UserRow
                  user={mentor}
                  date={date}
                  userId={mentor?.id}
                  hasLink
                />
              </StyledBox>
            )}
        </StyledStack>
      </>
    );

  const renderStudent = () =>
    !hideMentorAndStudent &&
    status && (
      <StyledUserRowBox>
        <UserRow user={student} date={date} userId={student?.id} hasLink />
      </StyledUserRowBox>
    );

  return (
    <>
      <StyledWrapper>
        <Typography variant="h5">Ответ на задание</Typography>
        {renderStatusAndMentor()}
      </StyledWrapper>
      <Divider />

      {testGroup && (
        <LectureTestSection
          testGroup={testGroup}
          trainingId={trainingId}
          lectureId={lectureId}
        />
      )}

      {renderStudent()}
      <StyledHomeworkContentBox>
        <HomeworkContent
          status={status}
          answer={answer}
          openHomeWorkEdit={openHomeWorkEdit}
          setOpenHomeWorkEdit={setOpenHomeWorkEdit}
          homeWorkId={homeWorkId}
          testGroup={testGroup}
          trainingId={trainingId}
          lectureId={lectureId}
        />
      </StyledHomeworkContentBox>

      <ButtonEdit
        editAccess={editAccess}
        openHomeWorkEdit={openHomeWorkEdit}
        setOpenHomeWorkEdit={setOpenHomeWorkEdit}
        status={status}
      />
    </>
  );
};

export default HomeworkItem;
