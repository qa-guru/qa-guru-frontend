import { Tree } from "antd";
import React from "react";
import { ICodeTree } from "./CodeTree.types";
const { DirectoryTree } = Tree;
import styles from "./CodeTree.module.scss";

const CodeTree: React.FC<ICodeTree> = ({
  treeData,
  defaultExpandedKeys,
  onSelect,
  defaultSelectedKeys,
}) => {
  return (
    <DirectoryTree
      multiple
      defaultExpandedKeys={defaultExpandedKeys}
      onSelect={onSelect}
      treeData={treeData}
      className={styles.tree}
      defaultSelectedKeys={defaultSelectedKeys}
    />
  );
};

export default CodeTree;
