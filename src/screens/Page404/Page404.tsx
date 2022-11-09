import { Button, Result } from "antd";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import LayoutOnCenter from "../../shared/ui/LayoutOnCenter/LayoutOnCenter";

export const Page404 = () => {
  const navigate = useNavigate();

  return (
    <LayoutOnCenter>
      <Result
        status="404"
        title="404"
        subTitle={<FormattedMessage id={"common.404"} />}
        extra={
          <Button type="primary" onClick={() => navigate(-1)}>
            <FormattedMessage id={"common.back"} />
          </Button>
        }
      />
    </LayoutOnCenter>
  );
};
