import React from "react";
import { Box, SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/icons/logo-footer.svg";
import { purple } from "../../theme/colors";

const style = {
  svgIcon: { height: "31px", width: { xs: "120px", sm: "166px" } },
  box: {
    bgcolor: purple.main,
    width: "100%",
    textAlign: "center",
    padding: "10px 0 0",
  },
  footer: {
    paddingTop: "50px",
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
