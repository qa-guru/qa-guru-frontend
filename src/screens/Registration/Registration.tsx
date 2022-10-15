import { Button, Typography } from "antd";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import SignUp from "../../features/Authorization/models/SignUp/SignUp";
import styles from "./Registration.module.scss";

const Registration = () => {
  let navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      <SignUp />
      <div className={styles.wrapp}>
        <Typography>Уже зарегистрировались?</Typography>
        <Button onClick={onClick} type="link">
          <FormattedMessage id="auth.login.submit" />
        </Button>
      </div>
    </div>
  );
};

export default Registration;
