import type { Node as ProseMirrorNode } from "prosemirror-model";

export default function collectFileIds(doc: ProseMirrorNode): string[] {
  const ids: string[] = [];

  doc.descendants((node: any) => {
    if (
      (node.type.name === "image" || node.type.name === "file") &&
      (node.attrs?.src || node.attrs?.href)
    ) {
      const url = node.attrs.src || node.attrs.href;

      if (url.startsWith("blob:")) {
        ids.push(url);
      } else {
        const match = url.match(/\/file\/(\d+)/);
        if (match) {
          ids.push(match[1]);
        }
      }
    }
  });

  return ids;
}
