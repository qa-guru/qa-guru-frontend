import React from "react";
import Ui from "../../../../shared/ui/Input";
import { IFormInputProps } from "../../../../shared/ui/Input/Input.types";
import Content from "../../config/ContentFormAutoTests";
import styles from "./InputVizualization.module.scss";

const InputVizualization: React.FC<IFormInputProps> = ({ control }) => {
  return (
    <div className={styles.wrapper}>
      <Ui.Checkbox
        name="allure_report"
        control={control}
        content={Content.ResultsReportContent.options}
      />
      <Ui.Checkbox
        name="attachments"
        control={control}
        content={Content.AttachmentsContent.options}
      />
    </div>
  );
};

export default InputVizualization;
