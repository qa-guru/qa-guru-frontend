import { FC } from "react";
import { IconButton, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import {
  StyledIconButton,
  StyledItemsStack,
  StyledTitleStack,
  StyledTypography,
} from "./edit-description.styled";
import { IEditDescription } from "./edit-description.types";

const EditDescription: FC<IEditDescription> = ({
  description,
  setDescription,
}) => {
  const handleAddDescription = () => {
    setDescription([...description, ""]);
  };

  const handleDescriptionChange = (index: number, value: string | null) => {
    const newDescription = [...description];
    newDescription[index] = value;
    setDescription(newDescription);
  };

  const handleRemoveDescription = (index: number) => {
    const newDescription = [...description];
    newDescription.splice(index, 1);
    setDescription(newDescription);
  };

  return (
    <>
      <StyledTitleStack>
        <Typography variant="h3">Содержание урока</Typography>
        <StyledIconButton onClick={handleAddDescription}>
          <AddIcon />
        </StyledIconButton>
      </StyledTitleStack>
      {description.map((desc, index) => (
        <StyledItemsStack key={index}>
          <StyledTypography variant="subtitle2">{index + 1}</StyledTypography>
          <TextField
            fullWidth
            multiline
            value={desc}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            placeholder="Введите содержание урока"
          />
          <IconButton onClick={() => handleRemoveDescription(index)}>
            <RemoveIcon color="primary" />
          </IconButton>
        </StyledItemsStack>
      ))}
    </>
  );
};

export default EditDescription;
