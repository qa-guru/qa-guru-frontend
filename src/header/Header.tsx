import AppMenu from "./Menu";
import LocalSelector from "../shared/LocalSelector";
import { Box, Paper, Toolbar } from "@mui/material";
import { ReactComponent as Logo } from "../icons/Logo-header.svg";
import Logout from "../features/Authorization/Logout";

const Header = () => {
  return (
    <header style={{ marginBottom: "30px" }}>
      <Paper sx={{ backgroundColor: "#FFFBFE", borderRadius: 0 }}>
        <Box
          sx={{
            padding: "7px 0 7px",
            maxWidth: "1920px",
            margin: "0 auto",
          }}
        >
          <Toolbar>
            <Logo style={{ margin: "7px 40px 0 0" }} />
            <AppMenu />
            <LocalSelector />
            <Logout />
          </Toolbar>
        </Box>
      </Paper>
    </header>
  );
};

export default Header;
