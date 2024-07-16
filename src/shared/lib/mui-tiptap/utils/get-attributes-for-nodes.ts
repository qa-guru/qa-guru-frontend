import { getNodeType } from "@tiptap/core";
import type { Node, NodeType } from "@tiptap/pm/model";
import type { EditorState } from "@tiptap/pm/state";

export function getAttributesForNodes(
  state: EditorState,
  typeOrName: string | NodeType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any>[] {
  const type = getNodeType(typeOrName, state.schema);
  const { from, to } = state.selection;
  const nodes: Node[] = [];

  state.doc.nodesBetween(from, to, (node) => {
    nodes.push(node);
  });

  return nodes
    .reverse()
    .filter((nodeItem) => nodeItem.type.name === type.name)
    .map((node) => ({ ...node.attrs }));
}
