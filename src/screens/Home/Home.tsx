import { Result, Spin } from "antd";
import { FormattedMessage } from "react-intl";
import { SmileOutlined } from "@ant-design/icons";

export const Home = () => {
  return (
    <Result
      icon={<SmileOutlined />}
      title={
        <FormattedMessage
          id="home.welcome"
          values={{ appName: "Qaguru Application" }}
        />
      }
    />
  );
};
