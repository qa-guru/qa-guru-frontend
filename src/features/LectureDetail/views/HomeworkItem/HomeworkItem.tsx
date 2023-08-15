import React, { useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { IHomeworkItem } from "./HomeworkItem.types";
import HomeworkContent from "./HomeworkContent";
import { style } from "./styles";
import ButtonEdit from "./ButtonEdit";
import StatusContent from "../../../../shared/components/StatusContent";
import Profile from "../Profile/Profile";

const HomeworkItem: React.FC<IHomeworkItem> = (props) => {
  const { dataHomeWorkByLecture, dataUserId } = props;
  const {
    status,
    startCheckingDate,
    endCheckingDate,
    mentor,
    student,
    creationDate,
    answer,
    id,
  } = dataHomeWorkByLecture! || {};

  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<boolean>(false);
  const editAccess = dataUserId.user?.id === student?.id;

  const date = status === "IN_REVIEW" ? startCheckingDate : endCheckingDate;

  return (
    <>
      <Stack
        sx={style.stack}
        spacing={{ xs: 0, sm: 3 }}
        direction="row"
        justifyContent={{ xs: "space-between", sm: "stretch" }}
      >
        <Typography variant="h5">Ответ на задание</Typography>
        <StatusContent status={status!} />
        <Stack
          direction={{ xs: "row", sm: "row" }}
          spacing={{ xs: 0.5, sm: 2 }}
        >
          {["NOT_APPROVED", "APPROVED", "IN_REVIEW"].includes(status!) && (
            <Box mt={{ xs: 2, sm: 0 }}>
              <Profile
                firstName={mentor?.firstName!}
                lastName={mentor?.lastName!}
                date={date}
              />
            </Box>
          )}
        </Stack>
      </Stack>
      <Divider />

      {status && (
        <Box mt="16px">
          <Profile
            firstName={student?.firstName!}
            lastName={student?.lastName!}
            date={creationDate!}
          />
        </Box>
      )}

      <Box mt="7px">
        <HomeworkContent
          status={status!}
          answer={answer!}
          openHomeWorkEdit={openHomeWorkEdit}
          setOpenHomeWorkEdit={setOpenHomeWorkEdit}
          id={id!}
        />
      </Box>
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
