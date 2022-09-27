import React from "react";
import Ui from "../../../../shared/ui/Input";
import { IProfileFormViews } from "./ProfileFormViews.types";

const ProfileFormViews: React.FC<IProfileFormViews> = ({ control }) => {
  return (
    <div>
      <Ui.Text name="firstName" control={control} label="FirstName" />
      <Ui.Text name="lastName" control={control} label="LastName" />
      <Ui.Text name="middleName" control={control} label="MiddleName" />
      <Ui.Text name="phoneNumber" control={control} label="PhoneNumber" />
    </div>
  );
};

export default ProfileFormViews;
