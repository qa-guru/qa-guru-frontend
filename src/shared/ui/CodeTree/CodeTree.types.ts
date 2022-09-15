import { Key } from "antd/lib/table/interface";
import { DataNode, EventDataNode } from "antd/lib/tree";

export interface ICodeTree {
  treeData: DataNode[];
  defaultExpandedKeys: Key[];
  defaultSelectedKeys: Key[];
  onSelect: (
    selectedKeys: Key[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode<DataNode>;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ) => void;
}
