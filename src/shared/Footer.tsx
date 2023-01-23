import React from "react";
import { Box } from "@mui/material";
import { ReactComponent as Logo } from "../icons/Logo-footer.svg";

const Footer: React.FC = () => {
  return (
    <footer style={{ paddingTop: "100px" }}>
      <Box
        bgcolor="#4A4458"
        position="fixed"
        bottom="0"
        width="100%"
        textAlign="center"
        padding="10px 0 0"
      >
        <Logo />
      </Box>
    </footer>
  );
};

export default Footer;
