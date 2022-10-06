import { Button, Typography } from "antd";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import Login from "../../features/Authorization/models/Login/Login";
import styles from "./Authorization.module.scss";

const Authorization = () => {
  let navigate = useNavigate();

  const onClick = () => {
    navigate("/register");
  };

  return (
    <div className={styles.wrapper}>
      <Login />
      <div className={styles.wrapp}>
        <Typography>Еще не зарегистрировались?</Typography>
        <Button onClick={onClick} type="link">
          <FormattedMessage id="auth.signup.submit" />
        </Button>
      </div>
    </div>
  );
};

export default Authorization;
