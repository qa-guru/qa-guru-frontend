import { useMediaQuery, useTheme } from "@mui/material";
import {
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonRedo,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuDivider,
  MenuButtonYoutube,
  MenuButtonEmoji,
} from "shared/lib/mui-tiptap/controls";

export default function EditorMenuControls() {
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <MenuControlsContainer>
      <MenuButtonEditLink />

      <MenuDivider />

      <MenuButtonCodeBlock />

      <MenuDivider />

      <MenuDivider />

      <MenuButtonYoutube />

      <MenuDivider />

      <MenuButtonEmoji />

      {isUpMd && (
        <>
          <MenuDivider />
          <MenuButtonUndo />
          <MenuButtonRedo />
        </>
      )}
    </MenuControlsContainer>
  );
}
