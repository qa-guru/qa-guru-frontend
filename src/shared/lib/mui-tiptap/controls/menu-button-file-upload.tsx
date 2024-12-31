import type { Editor } from "@tiptap/core";
import { useRef, type ComponentPropsWithoutRef } from "react";
import type { SetOptional } from "type-fest";

import { Maybe } from "api/graphql/generated/graphql";

import { useRichTextEditorContext } from "../context";
import { insertFiles, type FileNodeAttributes } from "../utils/files";
import MenuButtonAddFile, {
  type MenuButtonAddFileProps,
} from "./menu-button-add-file";

export interface MenuButtonFileUploadProps
  extends SetOptional<MenuButtonAddFileProps, "onClick"> {
  onUploadFiles: (files: File[]) => Promise<FileNodeAttributes[]>;
  insertFiles?: ({
    files,
    editor,
  }: {
    files: FileNodeAttributes[];
    editor: Maybe<Editor>;
  }) => void;
  inputProps?: Partial<ComponentPropsWithoutRef<"input">>;
}

export default function MenuButtonFileUpload({
  onUploadFiles,
  inputProps,
  ...props
}: MenuButtonFileUploadProps) {
  const editor = useRichTextEditorContext();

  const fileInput = useRef<Maybe<HTMLInputElement>>(null);

  const handleAndInsertNewFiles = async (files: FileList) => {
    if (!editor || editor.isDestroyed || files.length === 0) {
      return;
    }

    const fileAttributes = await onUploadFiles(Array.from(files));

    insertFiles({
      editor,
      files: fileAttributes,
    });
  };

  return (
    <>
      <MenuButtonAddFile
        tooltipLabel="Upload files"
        onClick={() => fileInput.current?.click()}
        {...props}
      />
      <input
        ref={fileInput}
        type="file"
        multiple
        onChange={async (event) => {
          if (event.target.files) {
            await handleAndInsertNewFiles(event.target.files);
          }
        }}
        style={{ display: "none" }}
        {...inputProps}
      />
    </>
  );
}
