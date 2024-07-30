import type { Editor } from "@tiptap/react";
import { createContext, useContext } from "react";

import { Maybe } from "api/graphql/generated/graphql";

export const RichTextEditorContext =
  createContext<Maybe<Editor | undefined>>(undefined);

export function useRichTextEditorContext(): Maybe<Editor> {
  const editor = useContext(RichTextEditorContext);
  if (editor === undefined) {
    throw new Error(
      "Tiptap editor not found in component context. Be sure to use <RichTextEditorProvider editor={editor} />!"
    );
  }

  return editor;
}
