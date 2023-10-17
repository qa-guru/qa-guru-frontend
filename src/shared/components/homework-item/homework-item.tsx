import { FC, useState } from "react";
import { Divider, Typography } from "@mui/material";
import StatusContent from "shared/components/status-content";
import UserRow from "shared/components/user-row";
import { IHomeworkItem } from "./homework-item.types";
import HomeworkContent from "./homework-content";
import {
  StyledBox,
  StyledHomeworkContentBox,
  StyledStack,
  StyledUserRowBox,
  StyledWrapper,
} from "./homework-item.styled";
import ButtonEdit from "./button-edit";

const HomeworkItem: FC<IHomeworkItem> = (props) => {
  const { dataHomeWorkByLecture, dataUserId, hideStatusAndMentor } = props;
  const {
    status,
    startCheckingDate,
    endCheckingDate,
    mentor,
    student,
    answer,
    id,
  } = dataHomeWorkByLecture! || {};

  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<boolean>(false);
  const editAccess = dataUserId.user?.id === student?.id;

  const date = status === "IN_REVIEW" ? startCheckingDate : endCheckingDate;

  return (
    <>
      <StyledWrapper>
        <Typography variant="h5">Ответ на задание</Typography>
        {!hideStatusAndMentor && (
          <>
            <StatusContent status={status!} />
            <StyledStack>
              {["NOT_APPROVED", "APPROVED", "IN_REVIEW"].includes(status!) && (
                <StyledBox>
                  <UserRow user={mentor!} date={date} />
                </StyledBox>
              )}
            </StyledStack>
          </>
        )}
      </StyledWrapper>
      <Divider />

      {status && (
        <StyledUserRowBox>
          <UserRow user={mentor!} date={date} />
        </StyledUserRowBox>
      )}

      <StyledHomeworkContentBox>
        <HomeworkContent
          status={status!}
          answer={answer!}
          openHomeWorkEdit={openHomeWorkEdit}
          setOpenHomeWorkEdit={setOpenHomeWorkEdit}
          id={id!}
        />
      </StyledHomeworkContentBox>
      <ButtonEdit
        editAccess={editAccess}
        openHomeWorkEdit={openHomeWorkEdit}
        setOpenHomeWorkEdit={setOpenHomeWorkEdit}
        status={status!}
      />
    </>
  );
};

export default HomeworkItem;
