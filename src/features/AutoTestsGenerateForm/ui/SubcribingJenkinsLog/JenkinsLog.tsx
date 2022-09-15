import { Modal, Typography } from "antd";
import { useState } from "react";
import { IFormSubscribing } from "../Subscribing.types";
import styles from "./JenkinsLog.module.scss";
import { FullscreenExitOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const JenkinsLog: React.FC<IFormSubscribing> = (content) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Text className={styles.title}>JenkinsLog</Text>
      <div className={styles.wrapp}>
        <div className={styles.wrapper}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
          corporis necessitatibus aperiam eum asperiores ducimus voluptates
          aliquid aut dolore nostrum esse placeat dignissimos ea nihil, ipsam
          tempora earum. Laudantium, quis. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptas corporis necessitatibus aperiam eum asperiores ducimus
          voluptates aliquid aut dolore nostrum esse placeat dignissimos ea
          nihil, ipsam tempora earum. Laudantium, quis. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptas corporis necessitatibus aperiam eum asperiores ducimus
          voluptates aliquid aut dolore nostrum esse placeat dignissimos ea
          nihil, ipsam tempora earum. Laudantium, quis. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptas corporis necessitatibus aperiam eum asperiores ducimus
          voluptates aliquid aut dolore nostrum esse placeat dignissimos ea
          nihil, ipsam tempora earum. Laudantium, quis. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis.
        </div>
        <FullscreenExitOutlined className={styles.icon} onClick={showModal} />
      </div>
      <Modal
        width={1100}
        title="Console Jenkins"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.wrapper_modal}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
          corporis necessitatibus aperiam eum asperiores ducimus voluptates
          aliquid aut dolore nostrum esse placeat dignissimos ea nihil, ipsam
          tempora earum. Laudantium, quis. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptas corporis necessitatibus aperiam eum asperiores ducimus
          voluptates aliquid aut dolore nostrum esse placeat dignissimos ea
          nihil, ipsam tempora earum. Laudantium, quis. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptas corporis necessitatibus aperiam eum asperiores ducimus
          voluptates aliquid aut dolore nostrum esse placeat dignissimos ea
          nihil, ipsam tempora earum. Laudantium, quis. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Voluptas corporis necessitatibus aperiam eum asperiores ducimus
          voluptates aliquid aut dolore nostrum esse placeat dignissimos ea
          nihil, ipsam tempora earum. Laudantium, quis. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Voluptas corporis necessitatibus
          aperiam eum asperiores ducimus voluptates aliquid aut dolore nostrum
          esse placeat dignissimos ea nihil, ipsam tempora earum. Laudantium,
          quis.
        </div>
      </Modal>
    </>
  );
};
