import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "../../icons/Logo.svg";
import styles from "./Registration.module.scss";
import { useTranslation } from "react-i18next";
import SignUp from "../../features/Authorization/SignUp";

const Registration = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const routeLogin = () => {
    navigate("/authorization");
  };

  return (
    <Stack className={styles.stack} justifyContent="center" alignItems="center">
      <Logo />
      <Paper
        sx={{ minWidth: { xs: "none", md: "430px" } }}
        className={styles.paper}
      >
        <SignUp />
        <Box textAlign="center">
          <Button
            style={{ textTransform: "none" }}
            variant="text"
            onClick={routeLogin}
          >
            {t("auth.route")}
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Registration;
