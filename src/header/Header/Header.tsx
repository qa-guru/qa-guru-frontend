import AppMenu from "../Menu/Menu";
import Logout from "../../features/Authorization/models/Logout/Logout";
import LocalSelector from "../../shared/ui/LocaleSelector/LocalSelector";
import { AppBar, Toolbar, Box } from "@mui/material";
import { useState } from "react";
import Spinner from "../../shared/ui/Spinner/Spinner";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AppBar style={{ backgroundColor: "#FFFBFE" }} position="static">
      <Toolbar>
        <AppMenu />
        <LocalSelector />
        <Logout setIsLoading={setIsLoading} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
