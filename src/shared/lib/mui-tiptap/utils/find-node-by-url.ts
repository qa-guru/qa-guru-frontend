import type { Node as ProseMirrorNode } from "prosemirror-model";

export function findNodeByUrl(
  doc: ProseMirrorNode,
  url: string
): { fileName?: string } | null {
  let result: { fileName?: string } | null = null;

  doc.descendants((node: any) => {
    if (
      (node.type.name === "image" || node.type.name === "file") &&
      (node.attrs?.src === url || node.attrs?.href === url)
    ) {
      result = { fileName: node.attrs?.fileName || node.attrs?.alt };
      return false;
    }
    return true;
  });

  return result;
}
