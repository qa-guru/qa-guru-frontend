import React from "react";
import { Box, SvgIcon } from "@mui/material";
import { style } from "./styles";
import { ReactComponent as Logo } from "../../assets/icons/logo-footer.svg";

const Footer: React.FC = () => {
  return (
    <footer style={style.footer}>
      <Box sx={style.box}>
        <SvgIcon sx={style.svgIcon} viewBox="0 0 166 31">
          <Logo />
        </SvgIcon>
      </Box>
    </footer>
  );
};

export default Footer;
