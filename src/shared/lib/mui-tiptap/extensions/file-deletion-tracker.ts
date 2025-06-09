import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

import { collectFileIds } from "../utils";

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
