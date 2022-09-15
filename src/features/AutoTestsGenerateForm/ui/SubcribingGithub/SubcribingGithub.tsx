import { Typography, Button } from "antd";
import { useEffect, useState } from "react";
import { IFormSubscribing } from "../Subscribing.types";
import GithubTree from "../GithubTree/GithubTree";
import FadeIn from "react-fade-in";
import styles from "./SubcribingGithub.module.scss";

const { Text } = Typography;

const SubcribingGithub: React.FC<IFormSubscribing> = (content) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 2500);
  }, [content]);

  return (
    <>
      <div className={styles.box}>
        <Text className={styles.title}>Github repository created:</Text>
        <Button href={content.content} type="link">
          {content.content}
        </Button>
      </div>
      {show && (
        <FadeIn>
          <GithubTree />
        </FadeIn>
      )}
    </>
  );
};

export default SubcribingGithub;
