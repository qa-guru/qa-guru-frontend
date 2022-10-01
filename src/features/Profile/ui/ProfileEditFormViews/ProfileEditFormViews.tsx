import React from "react";
import Ui from "../../../../shared/ui/Input";
import { IProfileEditFormViews } from "./ProfileEditFormViews.types";
import styles from "./ProfileEditFormViews.module.scss";

const ProfileEditFormViews: React.FC<IProfileEditFormViews> = ({ control }) => {
  return (
    <div className={styles.wrapper}>
      <Ui.Text name="firstName" control={control} label="FirstName" />
      <Ui.Text name="lastName" control={control} label="LastName" />
      <Ui.Text name="middleName" control={control} label="MiddleName" />
      <Ui.Text name="phoneNumber" control={control} label="PhoneNumber" />
    </div>
  );
};

export default ProfileEditFormViews;
