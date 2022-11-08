import { useNavigate } from "react-router-dom";
import SignUp from "../../features/Authorization/models/SignUp/SignUp";
import LayoutOnCenter from "../../shared/ui/LayoutOnCenter/LayoutOnCenter";
import { Button, Typography } from "@mui/material";
import styles from "./Registration.module.scss";
import { useTranslation } from "react-i18next";

const Registration = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const onClick = () => {
    navigate("/authorization");
  };

  return (
    <LayoutOnCenter>
      <SignUp />
      <div className={styles.wrapper}>
        <Typography> {t("signup.already.registered")}</Typography>
        <Button variant="text" onClick={onClick}>
          {t("login")}
        </Button>
      </div>
    </LayoutOnCenter>
  );
};

export default Registration;
