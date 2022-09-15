import { Tabs } from "antd";
import { StompSessionProvider } from "react-stomp-hooks";
import CountManualTestProvider from "../../features/AutoTestsGenerateForm/context/CountManualTestProvider";
import FormMain from "../../features/AutoTestsGenerateForm/models/FormMain/FormMain";
import { Subscribing } from "../../features/AutoTestsGenerateForm/models/Subscribing/Subscribing";
import FormTitles from "../../features/AutoTestsGenerateForm/ui/FormTitles/FormTitles";
import ContainerLeft from "../../shared/ui/Containers/ContainerLeft/ContainerLeft";
import ContainerRight from "../../shared/ui/Containers/ContainerRight/ConteinerRight";
const { TabPane } = Tabs;

const AutoTestsGenerateForm = () => {
  return (
    <CountManualTestProvider>
      {/* <StompSessionProvider
        url={"http://localhost:8080/ws"}
        // url={'https://api.autotests.cloud'}
      > */}
      <ContainerLeft>
        <FormMain />
      </ContainerLeft>
      <ContainerRight>
        <Tabs defaultActiveKey="2" type="card">
          <TabPane tab="Documentation" key="1">
            <FormTitles />
          </TabPane>
          <TabPane tab="Console output" key="2">
            <Subscribing />
          </TabPane>
        </Tabs>
      </ContainerRight>
      {/* </StompSessionProvider> */}
    </CountManualTestProvider>
  );
};

export default AutoTestsGenerateForm;
