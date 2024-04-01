import { useRef, useState, MouseEvent } from "react";
import { MenuButton, useRichTextEditorContext } from "shared/lib/mui-tiptap";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Popover, useTheme } from "@mui/material";
import { Maybe } from "api/graphql/generated/graphql";

import { MenuButtonProps } from "./menu-button";
import { getCustomPickerStyles } from "../styles";

export type MenuButtonEmojiProps = Partial<MenuButtonProps>;

export default function MenuButtonEmoji(props: MenuButtonEmojiProps) {
  const editor = useRichTextEditorContext();
  const buttonRef = useRef<Maybe<HTMLButtonElement>>(null);
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLButtonElement>>(null);

  const theme = useTheme();
  const customPickerStyles = getCustomPickerStyles(theme);

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
        disabled={!editor?.isEditable}
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
        <EmojiPicker
          onEmojiClick={onClick}
          width={300}
          height={400}
          style={customPickerStyles}
        />
      </Popover>
    </>
  );
}
