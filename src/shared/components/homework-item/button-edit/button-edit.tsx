import React from "react";
import { IButtonEdit } from "./button-edit.types";
import { StyledButton } from "./button-edit.styled";

const ButtonEdit: React.FC<IButtonEdit> = (props) => {
  const { openHomeWorkEdit, setOpenHomeWorkEdit, status, editAccess } = props;

  return (
    <>
      {!openHomeWorkEdit && status && editAccess && (
        <StyledButton
          variant="contained"
          onClick={() => setOpenHomeWorkEdit(true)}
        >
          Редактировать
        </StyledButton>
      )}
    </>
  );
};

export default ButtonEdit;
