import { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { AppMenu } from "../Menu/Menu";
import Logout from "../../features/Authorization/models/Logout/Logout";
import { LocaleSelector } from "../../i18n/localeSelector/LocaleSelector";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  let navigate = useNavigate();

  const routeProfileScreen = () => {
    navigate("/profile");
  };

  const { pathname: location } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <Button
        onClick={routeProfileScreen}
        shape="circle"
        icon={<UserOutlined />}
      />
      <Drawer
        title={"QA Guru"}
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        style={{ zIndex: 99999 }}
      >
        <AppMenu />
      </Drawer>
      <Button className={styles.menuButton} type="link" onClick={showDrawer}>
        <MenuOutlined style={{ color: "white" }} />
      </Button>
      <LocaleSelector />
      <Logout />
    </nav>
  );
};

export default Navbar;
