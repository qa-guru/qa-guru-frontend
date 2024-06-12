import { FC, useState } from "react";
import { Divider, Typography } from "@mui/material";
import StatusText from "shared/components/status-text";
import UserRow from "shared/components/user-row";

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
  const { dataHomeWorkByLectureAndTraining, dataUserId, hideMentorAndStudent } =
    props;
  const {
    status,
    startCheckingDate,
    endCheckingDate,
    mentor,
    student,
    answer,
    id,
  } = dataHomeWorkByLectureAndTraining || {};

  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<boolean>(false);
  const editAccess = dataUserId?.user?.id === student?.id;

  const date = status === "IN_REVIEW" ? startCheckingDate : endCheckingDate;

  return (
    <>
      <StyledWrapper>
        <Typography variant="h5">Ответ на задание</Typography>
        {!hideMentorAndStudent && (
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
        )}
      </StyledWrapper>

      <Divider />

      {!hideMentorAndStudent && status && (
        <StyledUserRowBox>
          <UserRow user={student} date={date} userId={student?.id} hasLink />
        </StyledUserRowBox>
      )}

      <StyledHomeworkContentBox>
        <HomeworkContent
          status={status}
          answer={answer}
          openHomeWorkEdit={openHomeWorkEdit}
          setOpenHomeWorkEdit={setOpenHomeWorkEdit}
          id={id}
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
