import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form } from "antd";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdatePersonMutation } from "../../../../api/mutation/updatePerson";
import { PersonInput } from "../../../../generated/graphql";
import { defaultValues } from "../../config/defaultValues";
import ProfileFormViews from "../../ui/ProfileFormViews/ProfileFormViews";

const Profile: React.FC = () => {
  const { handleSubmit, control } = useForm<PersonInput>({
    defaultValues,
  });
  const [updatePerson] = useUpdatePersonMutation();

  const onSubmit: SubmitHandler<PersonInput> = (data) => {
    updatePerson({
      variables: { input: data },
    });
  };

  return (
    <div>
      <Avatar size={170} icon={<UserOutlined />} />
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <ProfileFormViews control={control} />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Profile;
