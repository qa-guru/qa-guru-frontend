import { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { AppMenu } from "../Menu/Menu";
import Logout from "../../features/Authorization/models/Logout/Logout";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  const { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);

  return (
    <nav className={styles.navbar}>
      <Button className={styles.menuButton} type="text" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        title={"QA Guru"}
        placement="right"
        closable={true}
        onClose={showDrawer}
        visible={visible}
        style={{ zIndex: 99999 }}
      >
        <AppMenu />
      </Drawer>
      <Logout />
    </nav>
  );
};

export default Navbar;
