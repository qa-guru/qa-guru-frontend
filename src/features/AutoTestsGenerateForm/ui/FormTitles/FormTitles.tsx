import { Typography } from "antd";
import { useContext } from "react";
import { CountManualTestContext } from "../../context/CountManualTestProvider";
import cn from "classnames";
import styles from "./FormTitles.module.scss";
const { Text } = Typography;

const AutoTestsRight: React.FC = () => {
  const [countManualTest, setCountManualTest] = useContext(
    CountManualTestContext
  );

  return (
    <div className={styles.wrapper}>
      <Text className={`${styles.title} ${styles.url}`}>URL</Text>
      <Text className={`${styles.title} ${styles.code}`}>CODE</Text>
      <Text className={`${styles.subtitle} ${styles.framework}`}>
        Generate framework code base:
      </Text>
      <Text className={`${styles.title} ${styles.tests}`}>TESTS</Text>
      <Text className={`${styles.subtitle} ${styles.ai}`}>
        Generate tests with AI
      </Text>
      <Text className={`${styles.subtitle} ${styles.manual}`}>
        Manual Tests
      </Text>
      <Text
        className={cn(`${styles.title} ${styles.vizualization}`, {
          [styles[`vizualization_active__${countManualTest}`]]: countManualTest,
        })}
      >
        VISUALIZATION
      </Text>
      <Text className={`${styles.subtitle} ${styles.report}`}>
        Tests results report
      </Text>
      <Text className={`${styles.subtitle} ${styles.attachments}`}>
        Add attachments
      </Text>
      <Text className={`${styles.title} ${styles.infrastructure}`}>
        INFRASTRUCTURE
      </Text>
      <Text className={`${styles.subtitle} ${styles.source}`}>
        Source code (where to store code)
      </Text>
      <Text className={`${styles.subtitle} ${styles.cicd}`}>
        CI/CD Tool (where to run code)
      </Text>
      <Text className={`${styles.subtitle} ${styles.browser_type}`}>
        Browser type
      </Text>
      <Text className={`${styles.subtitle} ${styles.browser_hub}`}>
        Browsers hub
      </Text>
      <Text className={`${styles.title} ${styles.notification}`}>
        NOTIFICATIONS
      </Text>
      <Text className={`${styles.subtitle} ${styles.notification_test}`}>
        Add test results notifications
      </Text>
      <Text className={`${styles.title} ${styles.management}`}>
        TEST MANAGEMENT
      </Text>
      <Text className={`${styles.subtitle} ${styles.connect}`}>
        Connect with
      </Text>
    </div>
  );
};

export default AutoTestsRight;
