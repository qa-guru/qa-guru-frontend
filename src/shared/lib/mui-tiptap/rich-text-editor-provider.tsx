import { ReactNode } from "react";
import type { Editor } from "@tiptap/react";

import { Maybe } from "api/graphql/generated/graphql";

import { RichTextEditorContext } from "./context";

export type RichTextEditorProviderProps = {
  editor: Maybe<Editor>;
  children: ReactNode;
};

export default function RichTextEditorProvider({
  editor,
  children,
}: RichTextEditorProviderProps) {
  return (
    <RichTextEditorContext.Provider value={editor}>
      {children}
    </RichTextEditorContext.Provider>
  );
}
