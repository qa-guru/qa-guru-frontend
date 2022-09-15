import React from "react";
import Ui from "../../../../shared/ui/Input";
import { IAutoFormViewsProps } from "./FormViews.types";
import Content from "../../config/ContentFormAutoTests";
import InputTests from "../InputTests/InputTests";
import InputManualTests from "../InputManualTests/InputManualTests";
import styles from "./FormViews.module.scss";
import InputVizualization from "../InputVizualization/InputVizualization";
import InputInfrastructure from "../InputInfrastructure/InputInfrastructure";
import { icons } from "../../../../assets";

const renderIcons = (icons: string[]) => {
  return icons.map((icon) => <img width={25} key={icon} src={icon} />);
};

const AutoTestsFormViews: React.FC<IAutoFormViewsProps> = ({ control }) => {
  return (
    <>
      <div>{renderIcons(Object.values(icons))}</div>
      <div className={styles.form}>
        <div className={styles.border}>
          <Ui.Text
            name="url"
            control={control}
            placeholder="https://your.site"
          />
        </div>

        <div className={styles.border}>
          <Ui.Radio
            name="stack"
            control={control}
            content={Content.CodeContent.options}
            direction="vertical"
          />
        </div>

        <div className={styles.border}>
          <InputTests control={control} name="" />
          <br />
          <InputManualTests
            label="Add manual tests to automate:"
            control={control}
            name=""
          />
        </div>

        <div className={styles.border}>
          <InputVizualization control={control} name={""} />
        </div>

        <div className={styles.border}>
          <InputInfrastructure control={control} name={""} />
        </div>

        <div className={styles.border}>
          <Ui.Checkbox
            name="notification"
            control={control}
            content={Content.NotificationsContent.options}
          />
        </div>

        <div className={styles.border}>
          <Ui.Checkbox
            name="test_management"
            control={control}
            content={Content.TestManagementContent.options}
            direction="vertical"
          />
        </div>
      </div>
    </>
  );
};

export default AutoTestsFormViews;
