import { useRef, useState, MouseEvent } from "react";
import { MenuButton, useRichTextEditorContext } from "shared/lib/mui-tiptap";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Popover } from "@mui/material";
import { Maybe } from "api/graphql/generated/graphql";

import { MenuButtonProps } from "./menu-button";

export type MenuButtonEmojiProps = Partial<MenuButtonProps>;

export default function MenuButtonEmoji(props: MenuButtonEmojiProps) {
  const editor = useRichTextEditorContext();
  const buttonRef = useRef<Maybe<HTMLButtonElement>>(null);
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLButtonElement>>(null);

  const handleOpenPopover = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onClick = (emojiData: EmojiClickData) => {
    console.log(emojiData);

    editor?.commands.insertContent(emojiData.emoji);
  };

  return (
    <>
      <MenuButton
        buttonRef={buttonRef}
        tooltipLabel="Emoji"
        IconComponent={InsertEmoticonIcon}
        onClick={handleOpenPopover}
        {...props}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <EmojiPicker onEmojiClick={onClick} />
      </Popover>
    </>
  );
}
