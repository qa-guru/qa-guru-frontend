import { Modal, notification } from "antd";
import axios from "axios";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { observer } from "mobx-react";
import LogoutLocaleSelector from "../../ui/LogoutLocaleSelector/LogoutLocaleSelector";
import LogoutButton from "../../ui/LogoutButton/LogoutButton";
import useAuth from "../../../../hooks/useAuth";

const Logout = () => {
  const intl = useIntl();
  const { logout } = useAuth();

  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: intl.formatMessage({ id: "auth.logout.confirm" }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: async () => {
        try {
          const response = await logout();
          if (response.status !== 200) {
            notification.error({
              message: intl.formatMessage({ id: "auth.logout.unknownError" }),
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            notification.error({
              message: intl.formatMessage({ id: "auth.logout.unknownError" }),
            });
          }
        }
      },
    });
  }, [intl]);

  return (
    <>
      <LogoutLocaleSelector />
      <LogoutButton showLogoutConfirm={showLogoutConfirm} />
    </>
  );
};

export default observer(Logout);
