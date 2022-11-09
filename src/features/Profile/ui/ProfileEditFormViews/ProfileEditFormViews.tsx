import React from "react";
import RHF from "../../../../shared/ui/InputRHF";
import { IProfileEditFormViews } from "./ProfileEditFormViews.types";
import styles from "./ProfileEditFormViews.module.scss";

const ProfileEditFormViews: React.FC<IProfileEditFormViews> = ({ control }) => {
  return (
    <div className={styles.wrapper}>
      <RHF.InputTextField
        name="firstName"
        control={control}
        label="FirstName"
      />
      <RHF.InputTextField name="lastName" control={control} label="LastName" />
      <RHF.InputTextField
        name="middleName"
        control={control}
        label="MiddleName"
      />
      <RHF.InputTextField
        name="phoneNumber"
        control={control}
        label="PhoneNumber"
      />
    </div>
  );
};

export default ProfileEditFormViews;
