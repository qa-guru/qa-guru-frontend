import Ui from "../../../../shared/ui/Input";
import styles from "./InputManualTests.module.scss";
import { IFormInputProps } from "../../../../shared/ui/Input/Input.types";

const InputSingleManualTest: React.FC<IFormInputProps> = ({
  control,
  name,
}) => {
  return (
    <div className={styles.border}>
      <Ui.Text control={control} name={`title_${name}`} placeholder="title" />
      <Ui.TextArea
        control={control}
        name={`steps_${name}`}
        placeholder="steps"
      />
    </div>
  );
};

export default InputSingleManualTest;
