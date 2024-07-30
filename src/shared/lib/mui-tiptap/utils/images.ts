import type { Editor, JSONContent } from "@tiptap/core";

import { Maybe } from "api/graphql/generated/graphql";

export type ImageNodeAttributes = {
  src: string;
  alt?: string;
  title?: string;
};

export function insertImages({
  images,
  editor,
  position,
}: {
  images: ImageNodeAttributes[];
  editor: Maybe<Editor>;
  position?: number;
}): void {
  if (!editor || editor.isDestroyed || images.length === 0) {
    return;
  }

  const imageContentToInsert: JSONContent[] = images
    .filter((imageAttrs) => !!imageAttrs.src)
    .map((imageAttrs) => ({
      type: editor.schema.nodes.image.name,
      attrs: imageAttrs,
    }));

  editor
    .chain()
    .command(({ commands }) => {
      if (position == null) {
        return commands.insertContent(imageContentToInsert);
      } else {
        return commands.insertContentAt(position, imageContentToInsert);
      }
    })
    .focus()
    .run();
}
