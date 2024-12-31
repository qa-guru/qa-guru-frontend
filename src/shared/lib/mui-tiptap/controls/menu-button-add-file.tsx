import UploadFile from "@mui/icons-material/UploadFile";
import type { SetRequired } from "type-fest";

import { useRichTextEditorContext } from "../context";
import MenuButton, { type MenuButtonProps } from "./menu-button";

export type MenuButtonAddFileProps = SetRequired<
  Partial<MenuButtonProps>,
  "onClick"
>;

export default function MenuButtonAddFile({
  ...props
}: MenuButtonAddFileProps) {
  const editor = useRichTextEditorContext();

  return (
    <MenuButton
      tooltipLabel="Insert file"
      IconComponent={UploadFile}
      disabled={!editor?.isEditable}
      {...props}
    />
  );
}
