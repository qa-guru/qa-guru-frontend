import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { style } from "./styles";
import { ICardComponent } from "./card-component.types";
import { useLoadedImages } from "../../hooks/useLoadedImages";

const imgImports = import.meta.glob("../../assets/img/*.{jpeg,png}");
const CardComponent: React.FC<ICardComponent> = ({ section }) => {
  const loadedIcons = useLoadedImages(imgImports);

  return (
    <Card sx={style.centeredContent}>
      <CardContent>
        <Typography variant="h3">{section.Title}</Typography>
        <Box mt={5}>
          <img
            style={style.imgMain}
            src={loadedIcons[`../../assets/img/${section.Image}`]}
            alt={section.Title}
          />
        </Box>
        <Typography variant="h6">{section.Description}</Typography>
        <Typography variant="body2" width="60%">
          {section.Fulltext}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
