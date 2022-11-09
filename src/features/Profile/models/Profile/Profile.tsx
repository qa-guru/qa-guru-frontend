import { usePersonQuery } from "../../../../api/query/person";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import styles from "./Profile.module.scss";
import { Typography } from "@mui/material";

const Profile = () => {
  const { data, loading } = usePersonQuery();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <Typography align="center" variant="h4" component="h4">
        {data?.person?.firstName}
      </Typography>
      <Typography align="center" variant="h4" component="h4">
        {data?.person?.lastName}
      </Typography>
      <Typography align="center" variant="h4" component="h4">
        {data?.person?.middleName}
      </Typography>
      <Typography align="center" variant="h4" component="h4">
        {data?.person?.phoneNumber}
      </Typography>
    </div>
  );
};

export default Profile;
