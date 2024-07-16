import { useEditor, type EditorOptions } from "@tiptap/react";
import { useEffect, useRef } from "react";
import type { Except, SetRequired } from "type-fest";

import RichTextContent from "./rich-text-content";
import RichTextEditorProvider from "./rich-text-editor-provider";

export type RichTextReadOnlyProps = SetRequired<
  Partial<Except<EditorOptions, "editable">>,
  "extensions"
>;

function RichTextReadOnlyInternal(props: RichTextReadOnlyProps) {
  const editor = useEditor({
    ...props,
    editable: false,
  });

  const previousContent = useRef(props.content);
  useEffect(() => {
    if (
      !editor ||
      editor.isDestroyed ||
      props.content === undefined ||
      props.content === previousContent.current
    ) {
      return;
    }

    queueMicrotask(() => {
      if (props.content !== undefined) {
        editor.commands.setContent(props.content);
      }
    });
  }, [props.content, editor]);

  useEffect(() => {
    previousContent.current = props.content;
  }, [props.content]);

  return (
    <RichTextEditorProvider editor={editor}>
      <RichTextContent />
    </RichTextEditorProvider>
  );
}

export default function RichTextReadOnly(props: RichTextReadOnlyProps) {
  if (!props.content) {
    return null;
  }

  return <RichTextReadOnlyInternal {...props} />;
}
