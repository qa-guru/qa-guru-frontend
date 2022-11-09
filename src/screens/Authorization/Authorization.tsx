import { useNavigate } from "react-router-dom";
import Login from "../../features/Authorization/models/Login/Login";
import LayoutOnCenter from "../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { Button, Typography } from "@mui/material";
import styles from "./Authorization.module.scss";
import { useTranslation } from "react-i18next";

const Authorization = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const onClick = () => {
    navigate("/register");
  };

  return (
    <LayoutOnCenter>
      <Login />
      <div className={styles.wrapper}>
        <Typography> {t("login.not.registered.yet")}</Typography>
        <Button variant="text" onClick={onClick}>
          {t("signup")}
        </Button>
      </div>
    </LayoutOnCenter>
  );
};

export default Authorization;
