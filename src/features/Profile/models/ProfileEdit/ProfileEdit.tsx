import { Button, Form } from "antd";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdatePersonMutation } from "../../../../api/mutation/updatePerson";
import { PersonInput } from "../../../../generated/graphql";
import { defaultValues } from "../../config/defaultValues";
import ProfileEditAvatar from "../../ui/ProfileEditAvatar/ProfileEditAvatar";
import ProfileEditFormViews from "../../ui/ProfileEditFormViews/ProfileEditFormViews";
import styles from "./ProfileEdit.module.scss";
import { client } from "../../../../http";

const ProfileEdit: React.FC = () => {
  const { handleSubmit, control } = useForm<PersonInput>({
    defaultValues,
  });
  const [updatePerson] = useUpdatePersonMutation();

  const onSubmit: SubmitHandler<PersonInput> = (data) => {
    updatePerson({
      variables: { input: data },
      onCompleted: () => client.refetchQueries({ include: ["Person"] }),
    });
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <ProfileEditAvatar />
      <ProfileEditFormViews control={control} />
      <Button className={styles.btn} htmlType="submit">
        Save
      </Button>
    </Form>
  );
};

export default ProfileEdit;
