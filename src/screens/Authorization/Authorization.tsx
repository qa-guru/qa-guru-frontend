import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Stack, SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from "../../icons/Logo.svg";
import { useTranslation } from "react-i18next";
import Login from "../../features/Authorization/Login";
import { secondary } from "../../theme/colors";

const style = {
  svgIcon: { height: "38px", width: { xs: "170px", sm: "250px" } },
  paper: {
    minWidth: { xs: "none", md: "430px" },
    marginTop: { xs: "7px", md: "22px" },
  },
  stack: {
    height: "100vh",
    bgcolor: secondary.main,
  },
  button: {
    textTransform: "none",
  },
};

const Authorization = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const routeRegister = () => {
    navigate("/register");
  };

  return (
    <Stack justifyContent="center" alignItems="center" sx={style.stack}>
      <SvgIcon sx={style.svgIcon} viewBox="0 0 250 38">
        <Logo />
      </SvgIcon>

      <Paper sx={style.paper}>
        <Login />
        <Box textAlign="center">
          <Button sx={style.button} variant="text">
            {t("restore")}
          </Button>
        </Box>
        <Box textAlign="center">
          <Button sx={style.button} variant="text" onClick={routeRegister}>
            {t("reg.route")}
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Authorization;
