import Link from "@mui/icons-material/Link";
import { useRef } from "react";
import { Maybe } from "api/graphql/generated/graphql";

import { useRichTextEditorContext } from "../context";
import MenuButton, { type MenuButtonProps } from "./menu-button";

export type MenuButtonEditLinkProps = Partial<MenuButtonProps>;

export default function MenuButtonEditLink(props: MenuButtonEditLinkProps) {
  const editor = useRichTextEditorContext();
  const buttonRef = useRef<Maybe<HTMLButtonElement>>(null);
  return (
    <MenuButton
      buttonRef={buttonRef}
      tooltipLabel="Link"
      tooltipShortcutKeys={["mod", "Shift", "U"]}
      IconComponent={Link}
      selected={editor?.isActive("link")}
      disabled={!editor?.isEditable}
      onClick={() =>
        editor?.commands.openLinkBubbleMenu({
          anchorEl: buttonRef.current,
          placement: "bottom",
        })
      }
      {...props}
    />
  );
}
