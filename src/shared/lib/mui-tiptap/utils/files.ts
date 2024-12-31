import type { Editor, JSONContent } from "@tiptap/core";

import { Maybe } from "api/graphql/generated/graphql";

export type FileNodeAttributes = {
  href: string;
  fileName: string;
};

export function insertFiles({
  files,
  editor,
  position,
}: {
  files: FileNodeAttributes[];
  editor: Maybe<Editor>;
  position?: number;
}): void {
  if (!editor || editor.isDestroyed || files.length === 0) {
    return;
  }

  const fileContentToInsert: JSONContent[] = files
    .filter((fileAttrs) => !!fileAttrs.href)
    .map((fileAttrs) => ({
      type: editor.schema.nodes.file.name,
      attrs: fileAttrs,
    }));

  editor
    .chain()
    .command(({ commands }) => {
      if (position == null) {
        return commands.insertContent(fileContentToInsert);
      } else {
        return commands.insertContentAt(position, fileContentToInsert);
      }
    })
    .focus()
    .run();
}
