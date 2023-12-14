import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import type { SetRequired } from "type-fest";

import { useRichTextEditorContext } from "../context";
import MenuButton, { type MenuButtonProps } from "./menu-button";

export type MenuButtonAddImageProps = SetRequired<
  Partial<MenuButtonProps>,
  "onClick"
>;

export default function MenuButtonAddImage({
  ...props
}: MenuButtonAddImageProps) {
  const editor = useRichTextEditorContext();

  return (
    <MenuButton
      tooltipLabel="Insert image"
      IconComponent={AddPhotoAlternate}
      disabled={
        !editor?.isEditable ||
        !editor.can().setImage({ src: "http://example.com" })
      }
      {...props}
    />
  );
}
