import {
  Box,
  Button,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  MenuButton,
  MenuButtonProps,
  useRichTextEditorContext,
} from "shared/lib/mui-tiptap";
import { styled } from "@mui/system";
import { Maybe } from "api/graphql/generated/graphql";

function extractVideoID(url: string) {
  // Regular expression to match various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match?.[2]?.length === 11 ? match[2] : null;
}

export type MenuButtonYoutubeProps = Partial<MenuButtonProps>;

export default function MenuButtonYoutube(props: MenuButtonYoutubeProps) {
  const editor = useRichTextEditorContext();
  const buttonRef = useRef<Maybe<HTMLButtonElement>>(null);
  const [anchorEl, setAnchorEl] = useState<Maybe<HTMLButtonElement>>(null);
  const [inputValue, setInputValue] = useState("");

  const handleOpenPopover = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      const videoId = extractVideoID(inputValue);
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;

      editor?.commands.setYoutubeVideo({
        src: embedUrl,
      });
    }
    handleClosePopover();
  };

  return (
    <>
      <MenuButton
        buttonRef={buttonRef}
        tooltipLabel="Youtube"
        IconComponent={YouTubeIcon}
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
        <form onSubmit={handleSubmit}>
          <StyledBox>
            <Typography variant="h6">Add Youtube link</Typography>
            <TextField
              placeholder="Link*"
              margin="normal"
              size="small"
              fullWidth
              value={inputValue}
              onChange={handleInputChange}
            />
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing="8px"
              mt="7px"
            >
              <Button
                onClick={handleClosePopover}
                color="secondary"
                variant="contained"
                size="small"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="small"
                style={{ color: "white" }}
              >
                Save
              </Button>
            </Stack>
          </StyledBox>
        </form>
      </Popover>
    </>
  );
}

export const StyledBox = styled(Box)({
  padding: "12px 16px 12px",
});
