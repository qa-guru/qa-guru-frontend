import { FC } from "react";

import { isHomeworkStudentEditable } from "shared/helpers";

import { IButtonEdit } from "./button-edit.types";
import { StyledButton } from "./button-edit.styled";

const ButtonEdit: FC<IButtonEdit> = (props) => {
  const { openHomeWorkEdit, setOpenHomeWorkEdit, status, editAccess } = props;

  return (
    <>
      {!openHomeWorkEdit && isHomeworkStudentEditable(status) && editAccess && (
        <StyledButton
          variant="contained"
          onClick={() => setOpenHomeWorkEdit(true)}
        >
          {status === "NOT_APPROVED"
            ? "Исправить и отправить повторно"
            : "Редактировать"}
        </StyledButton>
      )}
    </>
  );
};

export default ButtonEdit;
