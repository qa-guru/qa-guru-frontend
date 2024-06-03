import React from "react";
import { Box, Typography } from "@mui/material";

import { style } from "./styles";
import { IIconsRenderer } from "./IconsRenderer.types";

const IconsRenderer: React.FC<IIconsRenderer> = ({ icons, loadedIcons }) => {
  return (
    <Box sx={style.centeredIcons}>
      {icons.map((icon, index) => (
        <Box
          key={index}
          sx={style.iconWrapper}
          style={{
            backgroundColor: icon.colored ? "#1f1e1e" : "black",
            border: icon.colored ? "1px dashed gray" : "1px solid black",
          }}
        >
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
              color: icon.colored ? "white" : "black",
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
