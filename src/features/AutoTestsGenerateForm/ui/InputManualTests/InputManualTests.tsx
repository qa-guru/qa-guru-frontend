import { IFormInputProps } from "../../../../shared/ui/Input/Input.types";
import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "./InputManualTests.module.scss";
import { Typography } from "antd";
import { useContext, useState } from "react";
import InputSingleManualTest from "./InputSingleManualTest";
import { defaultValues } from "../../config/defaultValues";
import { CountManualTestContext } from "../../context/CountManualTestProvider";
const { Text } = Typography;

const InputManualTests: React.FC<IFormInputProps> = ({ control, label }) => {
  const [array, setArray] = useState<any[]>([]);

  const [countManualTest, setCountManualTest] = useContext(
    CountManualTestContext
  );

  const handleCreateManualTest = () => {
    if (array.length < 9) {
      setArray([...array, { id: Math.random() }]);
      setCountManualTest(4 + array.length);
    }
  };

  const addManualTestInDefaultValues = (
    argDefaultValues: any,
    argCountContext: any
  ) => {
    argDefaultValues[`title_${argCountContext}`] = "";
    argDefaultValues[`steps_${argCountContext}`] = "";
  };

  addManualTestInDefaultValues(defaultValues, countManualTest);

  return (
    <>
      <Text>{label}</Text>
      <div className={styles.wrapper}>
        <InputSingleManualTest control={control} name="1" key="1" />
        <InputSingleManualTest control={control} name="2" key="2" />
        <InputSingleManualTest control={control} name="3" key="3" />
        {array.map((arr, index) => (
          <InputSingleManualTest
            key={arr.id}
            control={control}
            name={index + 4}
          />
        ))}
        <PlusCircleOutlined
          onClick={handleCreateManualTest}
          className={styles.icon}
        />
      </div>
    </>
  );
};

export default InputManualTests;
