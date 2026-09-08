import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ThemeSelector from "shared/components/theme-selector";
import { OIDC_LOGIN_URI } from "config";

import { ILogin } from "./login.types";
import {
  StyledBottomStack,
  StyledButton,
  StyledLoadingButton,
  StyledLogo,
  StyledPaper,
  StyledStack,
  StyledWrapper,
  StyledSelectorWrapper,
} from "../views.styled";
import { ROUTES } from "../../constants";
import { useAuth } from "../../context/auth-context";

const Login: FC<ILogin> = (props) => {
  const { isLoading } = props;
  const navigate = useNavigate();
  const { session } = useAuth();

  const routeRegister = () => {
    navigate(ROUTES.SIGNUP);
  };

  const roureReset = () => {
    navigate(ROUTES.RESET);
  };

  useEffect(() => {
    if (session) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [session, navigate]);

  return (
    <StyledWrapper>
      <StyledSelectorWrapper>
        <ThemeSelector />
      </StyledSelectorWrapper>
      <StyledLogo />
      <StyledPaper>
        <StyledStack>
          <StyledLoadingButton
            id="login-oidc"
            href={OIDC_LOGIN_URI}
            loading={isLoading}
            variant="contained"
          >
            Войти через Keycloak
          </StyledLoadingButton>
        </StyledStack>
        <StyledBottomStack>
          <StyledButton variant="text" onClick={roureReset}>
            Восстановить пароль
          </StyledButton>
          <StyledButton variant="text" onClick={routeRegister}>
            Регистрация
          </StyledButton>
        </StyledBottomStack>
      </StyledPaper>
    </StyledWrapper>
  );
};

export default Login;
