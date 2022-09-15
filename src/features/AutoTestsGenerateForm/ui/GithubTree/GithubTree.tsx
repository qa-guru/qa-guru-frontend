import React, { useEffect, useState } from "react";
import CodeTree from "../../../../shared/ui/CodeTree/CodeTree";
import type { DirectoryTreeProps } from "antd/lib/tree";
import ContentTree from "../../config/ContentGithubTree";
import CodeContent from "../../config/ContentGithubCode";
import CodeEditor from "../../../../shared/ui/CodeEditor/CodeEditor";
import FadeIn from "react-fade-in";
import styles from "./GithubTree.module.scss";
import { FullscreenExitOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const GithubTree: React.FC = () => {
  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    if (info.node.isLeaf === true) {
      setTitle(info.node.title);
    }
  };

  const [title, setTitle] = useState<unknown>();

  const renderCodeComponents = (maxHeight: string) => {
    switch (title) {
      case "App.java":
        return (
          <CodeEditor maxHeight={maxHeight} code={CodeContent.AppContent} />
        );
      case "AppConfig.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.AppConfigContent}
          />
        );
      case "Project.java":
        return (
          <CodeEditor maxHeight={maxHeight} code={CodeContent.ProjectContent} />
        );
      case "ProjectConfig.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.ProjectConfigContent}
          />
        );
      case "CssXpathExamples.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.CssXpathExamplesContent}
          />
        );
      case "SelenideSnippets.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.SelenideSnippetsContent}
          />
        );
      case "AllureAttachments.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.AllureAttachmentsContent}
          />
        );
      case "AllureRestAssuredFilter.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.AllureRestAssuredFilterContent}
          />
        );
      case "DriverSettings.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.DriverSettingsContent}
          />
        );
      case "DriverUtils.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.DriverUtilsContent}
          />
        );
      case "LoginTests.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.LoginTestsContent}
          />
        );
      case "GeneratedTests.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.GeneratedTestsContent}
          />
        );
      case "TestBase.java":
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.TestBaseContent}
          />
        );
      default:
        return (
          <CodeEditor
            maxHeight={maxHeight}
            code={CodeContent.GeneratedTestsContent}
          />
        );
    }
  };

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
      <div className={styles.wrapper}>
        <div className={styles.tree}>
          <CodeTree
            onSelect={onSelect}
            treeData={ContentTree.TreeDataContent}
            defaultExpandedKeys={["0-0-0", "0-0-0-3"]}
            defaultSelectedKeys={["0-0-0-3-1"]}
          />
        </div>
        <div className={styles.code}>
          <FadeIn>{renderCodeComponents("335px")}</FadeIn>
          <Modal
            width={1100}
            title="Code"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <FadeIn>{renderCodeComponents("100%")}</FadeIn>
          </Modal>
          <FullscreenExitOutlined className={styles.icon} onClick={showModal} />
        </div>
      </div>
    </>
  );
};

export default GithubTree;
