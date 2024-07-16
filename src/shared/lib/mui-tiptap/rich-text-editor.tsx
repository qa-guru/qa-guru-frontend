import { useEditor, type Editor, type EditorOptions } from "@tiptap/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  ReactNode,
  type DependencyList,
} from "react";
import type { Except, SetRequired } from "type-fest";
import { Maybe } from "api/graphql/generated/graphql";

import RichTextEditorProvider from "./rich-text-editor-provider";
import RichTextField, { type RichTextFieldProps } from "./rich-text-field";

export interface RichTextEditorProps
  extends SetRequired<Partial<EditorOptions>, "extensions"> {
  renderControls?: (editor: Maybe<Editor>) => ReactNode;

  RichTextFieldProps?: Except<RichTextFieldProps, "controls">;

  children?: (editor: Maybe<Editor>) => ReactNode;

  editorDependencies?: DependencyList;
  className?: string;
}

export type RichTextEditorRef = {
  editor: Maybe<Editor>;
};

const RichTextEditor = forwardRef<RichTextEditorRef, RichTextEditorProps>(
  (
    {
      className,
      renderControls,
      RichTextFieldProps = {},
      children,
      editorDependencies = [],
      editable = true,
      ...editorProps
    }: RichTextEditorProps,
    ref
  ) => {
    const editor = useEditor(
      {
        editable,
        ...editorProps,
      },
      editorDependencies
    );

    useImperativeHandle<RichTextEditorRef, RichTextEditorRef>(ref, () => ({
      editor,
    }));

    useEffect(() => {
      if (!editor || editor.isDestroyed || editor.isEditable === editable) {
        return;
      }

      queueMicrotask(() => editor.setEditable(editable));
    }, [editable, editor]);

    return (
      <RichTextEditorProvider editor={editor}>
        <RichTextField
          disabled={!editable}
          controls={renderControls?.(editor)}
          className={className}
          {...RichTextFieldProps}
        />
        {children?.(editor)}
      </RichTextEditorProvider>
    );
  }
);

export default RichTextEditor;
