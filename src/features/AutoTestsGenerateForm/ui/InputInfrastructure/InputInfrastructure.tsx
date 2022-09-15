import Ui from "../../../../shared/ui/Input";
import { IFormInputProps } from "../../../../shared/ui/Input/Input.types";
import Content from "../../config/ContentFormAutoTests";
import styles from "./InputInfrastructure.module.scss";

const InputInfrastructure: React.FC<IFormInputProps> = ({ control }) => {
  return (
    <div className={styles.wrapper}>
      <Ui.Radio
        name="source_code"
        control={control}
        content={Content.SourceCodeContent.options}
      />

      <Ui.Radio
        name="ci"
        control={control}
        content={Content.CICDToolContent.options}
      />

      <Ui.Radio
        name="browser_type"
        control={control}
        content={Content.BrowserTypeContent.options}
      />

      <Ui.Radio
        name="browsers_hub"
        control={control}
        content={Content.BrowsersHubContent.options}
      />
    </div>
  );
};

export default InputInfrastructure;
