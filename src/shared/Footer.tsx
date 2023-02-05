import React from "react";
import { Box, SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from "../icons/Logo-footer.svg";
import { secondary } from "../theme/colors";

const style = {
  svgIcon: { height: "31px", width: { xs: "120px", sm: "166px" } },
  box: {
    bgcolor: secondary.main,
    position: "fixed",
    bottom: "0",
    width: "100%",
    textAlign: "center",
    padding: "10px 0 0",
  },
  footer: {
    paddingTop: "100px",
  },
};

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
