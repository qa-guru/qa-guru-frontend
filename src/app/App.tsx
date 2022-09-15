import { AppRoutes } from "../routes/AppRoutes";
import Navbar from "../widgets/Navbar/Navbar";
import styles from "./App.module.scss";

export const App = () => {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <AppRoutes />
      </main>
    </>
  );
};

export default App;
