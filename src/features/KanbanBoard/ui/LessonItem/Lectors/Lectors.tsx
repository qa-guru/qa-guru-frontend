import { Typography } from "antd";
// import { Lector } from "../../../../../assets";
import styles from "./Lectors.module.scss";

const Lectors = () => {
  return (
    <div className={styles.lectors}>
      <Typography className={styles.lectors_title}>Lectors:</Typography>
      <div className={styles.lectors_wrapper}>
        <div className={styles.lectors_wrapp}>
          {/*<img src={Lector} alt="Lector" />*/}
          <Typography className={styles.lectors_name}>
            Stanislav Vasenkov
          </Typography>
        </div>
        <div className={styles.lectors_wrapp}>
          {/*<img src={Lector} alt="Lector" />*/}
          <Typography className={styles.lectors_name}>
            Stanislav Vasenkov
          </Typography>
        </div>
        <div className={styles.lectors_wrapp}>
          {/*<img src={Lector} alt="Lector" />*/}
          <Typography className={styles.lectors_name}>
            Stanislav Vasenkov
          </Typography>
        </div>
        <div className={styles.lectors_wrapp}>
          {/*<img src={Lector} alt="Lector" />*/}
          <Typography className={styles.lectors_name}>
            Stanislav Vasenkov
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Lectors;
