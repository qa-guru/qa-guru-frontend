import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdatePersonMutation } from "../../../../api/graphql/user/updatePerson";
import { PersonInput } from "../../../../generated/graphql";
import ProfileEditFormViews from "../../ui/ProfileEditFormViews/ProfileEditFormViews";
import { Button } from "@mui/material";
import styles from "./ProfileEdit.module.scss";
import { client } from "../../../../http";

const ProfileEdit: React.FC = () => {
  const { handleSubmit, control } = useForm<PersonInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      phoneNumber: "",
    },
  });
  const [updatePerson] = useUpdatePersonMutation();

  const onSubmit: SubmitHandler<PersonInput> = (data) => {
    updatePerson({
      variables: { input: data },
      onCompleted: () => client.refetchQueries({ include: ["Person"] }),
    });
  };

  return (
    <form className={styles.form}>
      <ProfileEditFormViews control={control} />
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Save
      </Button>
    </form>
  );
};

export default ProfileEdit;
