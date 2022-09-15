import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./LogoutButton.module.scss";

interface ILogoutButton {
  showLogoutConfirm: () => void;
}

const LogoutButton: React.FC<ILogoutButton> = ({ showLogoutConfirm }) => {
  return (
    <Button
      className={styles.btn}
      type="text"
      icon={<LogoutOutlined />}
      onClick={showLogoutConfirm}
    />
  );
};

export default LogoutButton;
