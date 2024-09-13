import React from "react";
import { Box, Typography } from "@mui/material";

import { style } from "./styles";
import { IIconsRenderer } from "./icons-renderer.types";

const IconsRenderer: React.FC<IIconsRenderer> = ({ icons, loadedIcons }) => {
  return (
    <Box sx={style.centeredIcons}>
      {icons.map((icon, index) => (
        <Box key={index} sx={style.iconWrapper}>
          <img
            src={loadedIcons[`../../assets/icons/${icon.src}`]}
            alt={icon.title}
            style={{
              filter: icon.colored ? "none" : "grayscale(100%)",
              opacity: icon.colored ? "100%" : "30%",
            }}
          />
          <Typography
            style={{
              fontSize: "10px",
              textAlign: "center",
              marginTop: 5,
              whiteSpace: "nowrap",
            }}
          >
            {icon.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default IconsRenderer;
