import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Stack } from "@mui/material";
import { ReactComponent as Logo } from "../../icons/Logo.svg";
import { useTranslation } from "react-i18next";
import SignUp from "../../features/Authorization/SignUp";

const Registration = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const routeLogin = () => {
    navigate("/authorization");
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        backgroundColor: "var(--gx-color-background-auth)",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Logo />
      <Paper
        sx={{
          minWidth: { xs: "none", md: "430px" },
          marginTop: { xs: "7px", md: "22px" },
        }}
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
