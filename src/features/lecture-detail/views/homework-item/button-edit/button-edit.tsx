import React from "react";
import { Button } from "@mui/material";
import { IButtonEdit } from "./button-edit.types";
import { style } from "./styles";

const ButtonEdit: React.FC<IButtonEdit> = (props) => {
  const { openHomeWorkEdit, setOpenHomeWorkEdit, status, editAccess } = props;

  return (
    <>
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

export default ButtonEdit;
