import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { IHomeworkItem } from "./HomeworkItem.types";
import StatusContent from "./StatusContent";
import HomeworkContent from "./HomeworkContent";
import Profile from "../Profile/Profile";

const style = {
  buttonUpdate: { textTransform: "none", minWidth: "147px", mt: "15px" },
};

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
        spacing={{ xs: 1, sm: 3 }}
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "space-between", sm: "stretch" }}
      >
        <Typography variant="h5">Ответ на задание</Typography>
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={{ xs: 0.5, sm: 2 }}
        >
          <StatusContent status={status!} />
          {["NOT_APPROVED", "APPROVED", "IN_REVIEW"].includes(status!) && (
            <Profile
              firstName={mentor?.firstName!}
              lastName={mentor?.lastName!}
              date={date}
            />
          )}
        </Stack>
      </Stack>

      {status && (
        <Box mt="10px">
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
      {!openHomeWorkEdit && status && editAccess && (
        <Button
          onClick={() => setOpenHomeWorkEdit(true)}
          sx={style.buttonUpdate}
          variant="contained"
        >
          Редактировать
        </Button>
      )}
    </>
  );
};

export default HomeworkItem;
