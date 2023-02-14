import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Stack, SvgIcon } from "@mui/material";
import { ReactComponent as Logo } from "../icons/logo.svg";
import { useTranslation } from "react-i18next";
import SignUp from "../features/Authorization/SignUp";
import { secondary } from "../theme/colors";

const style = {
  svgIcon: { height: "38px", width: { xs: "170px", sm: "250px" } },
  paper: {
    minWidth: { xs: "none", md: "430px" },
    marginTop: { xs: "7px", md: "22px" },
  },
  stack: {
    height: "100vh",
  },
  button: { textTransform: "none" },
};

const Registration = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const routeLogin = () => {
    navigate("/authorization");
  };

  return (
    <Stack
      sx={style.stack}
      bgcolor={secondary.main}
      justifyContent="center"
      alignItems="center"
    >
      <SvgIcon sx={style.svgIcon} viewBox="0 0 250 38">
        <Logo />
      </SvgIcon>
      <Paper sx={style.paper}>
        <SignUp />
        <Box textAlign="center">
          <Button sx={style.button} variant="text" onClick={routeLogin}>
            {t("auth.route")}
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Registration;
