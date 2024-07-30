import type { Editor } from "@tiptap/core";
import { useRef, type ComponentPropsWithoutRef } from "react";
import type { SetOptional } from "type-fest";

import { Maybe } from "api/graphql/generated/graphql";

import { useRichTextEditorContext } from "../context";
import { insertImages, type ImageNodeAttributes } from "../utils/images";
import MenuButtonAddImage, {
  type MenuButtonAddImageProps,
} from "./menu-button-add-image";

export interface MenuButtonImageUploadProps
  extends SetOptional<MenuButtonAddImageProps, "onClick"> {
  onUploadFiles: (
    files: File[]
  ) => ImageNodeAttributes[] | Promise<ImageNodeAttributes[]>;
  insertImages?: ({
    images,
    editor,
  }: {
    images: ImageNodeAttributes[];
    editor: Maybe<Editor>;
  }) => void;
  inputProps?: Partial<ComponentPropsWithoutRef<"input">>;
}

export default function MenuButtonImageUpload({
  onUploadFiles,
  inputProps,
  ...props
}: MenuButtonImageUploadProps) {
  const editor = useRichTextEditorContext();

  const fileInput = useRef<Maybe<HTMLInputElement>>(null);

  const handleAndInsertNewFiles = async (files: FileList) => {
    if (!editor || editor.isDestroyed || files.length === 0) {
      return;
    }
    const attributesForImages = await onUploadFiles(Array.from(files));
    insertImages({
      editor,
      images: attributesForImages,
    });
  };

  return (
    <>
      <MenuButtonAddImage
        tooltipLabel="Upload images"
        onClick={() => fileInput.current?.click()}
        {...props}
      />
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
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
