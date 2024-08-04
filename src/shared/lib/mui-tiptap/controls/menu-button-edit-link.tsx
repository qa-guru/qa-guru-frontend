import Link from "@mui/icons-material/Link";
import { useRef } from "react";
import { type PopoverOrigin } from "@mui/material";

import { Maybe } from "api/graphql/generated/graphql";

import { useRichTextEditorContext } from "../context";
import MenuButton, { type MenuButtonProps } from "./menu-button";

export type MenuButtonEditLinkProps = Partial<MenuButtonProps>;

export default function MenuButtonEditLink(props: MenuButtonEditLinkProps) {
  const editor = useRichTextEditorContext();
  const buttonRef = useRef<Maybe<HTMLButtonElement>>(null);

  const anchorOrigin: PopoverOrigin = {
    vertical: "bottom",
    horizontal: "center",
  };

  const transformOrigin: PopoverOrigin = {
    vertical: "top",
    horizontal: "center",
  };

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
          placement: {
            anchorOrigin,
            transformOrigin,
          },
        })
      }
      {...props}
    />
  );
}
