import { useNavigate } from "react-router-dom";
import Login from "../../features/Authorization/models/Login/Login";
import { Box, Button, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "../../icons/Logo.svg";
import styles from "../Registration/Registration.module.scss";
import { useTranslation } from "react-i18next";

const Authorization = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const routeRegister = () => {
    navigate("/register");
  };

  return (
    <Stack
      color="secondary"
      justifyContent="center"
      alignItems="center"
      className={styles.stack}
    >
      <Logo />
      <Paper
        sx={{ minWidth: { xs: "none", md: "430px" } }}
        className={styles.paper}
      >
        <Login />
        <Box textAlign="center">
          <Button variant="text">{t("restore")}</Button>
        </Box>
        <Box textAlign="center">
          <Button variant="text" onClick={routeRegister}>
            {t("reg.route")}
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Authorization;
