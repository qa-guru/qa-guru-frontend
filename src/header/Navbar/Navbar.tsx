import { useNavigate } from "react-router-dom";
import AppMenu from "../Menu/Menu";
import Logout from "../../features/Authorization/models/Logout/Logout";
import LocalSelector from "../../shared/ui/LocaleSelector/LocalSelector";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import Spinner from "../../shared/ui/Spinner/Spinner";

const Navbar = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const routeProfileScreen = () => {
    navigate("profile");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AppBar style={{ backgroundColor: "#FFFBFE" }} position="static">
      <Toolbar>
        <AppMenu />
        {/*<IconButton*/}
        {/*  size="large"*/}
        {/*  aria-label="account of current user"*/}
        {/*  aria-controls="menu-appbar"*/}
        {/*  aria-haspopup="true"*/}
        {/*  onClick={routeProfileScreen}*/}
        {/*>*/}
        {/*  <AccountCircle />*/}
        {/*</IconButton>*/}
        <LocalSelector />
        <Logout setIsLoading={setIsLoading} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
