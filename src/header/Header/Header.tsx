import AppMenu from "../Menu/Menu";
import Logout from "../../features/Authorization/models/Logout/Logout";
import LocalSelector from "../../shared/ui/LocaleSelector/LocalSelector";
import { AppBar, Stack, Toolbar } from "@mui/material";
import { useState } from "react";
import Spinner from "../../shared/ui/Spinner/Spinner";
import { ReactComponent as Logo } from "../../icons/Logo-header.svg";
import styles from "./Header.module.scss";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AppBar className={styles.appbar} color="secondary" position="static">
      <Toolbar disableGutters>
        <Logo className={styles.logo} />
        <AppMenu />
        <LocalSelector />
        <Logout setIsLoading={setIsLoading} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
