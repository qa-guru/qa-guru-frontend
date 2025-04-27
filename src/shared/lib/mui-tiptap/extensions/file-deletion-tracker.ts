import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import type { Node as ProseMirrorNode } from "prosemirror-model";

export const FileDeletionTracker = Extension.create<{
  onFileDelete: (fileIdOrBlob: string) => void;
}>({
  name: "fileDeletionTracker",

  addOptions() {
    return {
      onFileDelete: () => {},
    };
  },

  addProseMirrorPlugins() {
    const onFileDelete = this.options?.onFileDelete;

    return [
      new Plugin({
        key: new PluginKey("file-deletion-tracker"),
        appendTransaction(transactions, oldState, newState) {
          const docChanged = transactions.some((tr) => tr.docChanged);
          if (!docChanged) return null;

          const oldFileIds = collectFileIds(oldState.doc);
          const newFileIds = collectFileIds(newState.doc);

          const deletedIds = oldFileIds.filter(
            (id) => !newFileIds.includes(id)
          );

          if (typeof onFileDelete === "function") {
            deletedIds.forEach((id) => {
              onFileDelete(id);
            });
          }

          return null;
        },
      }),
    ];
  },
});

function collectFileIds(doc: ProseMirrorNode): string[] {
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
