import { NodeViewWrapper } from "@tiptap/react";
import {
  IconButton,
  Typography,
  Tooltip,
  Paper,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

export default function FileNodeView({ node, deleteNode }: any) {
  const { href, fileName } = node.attrs;
  const theme = useTheme();

  return (
    <NodeViewWrapper
      as="span"
      style={{
        display: "inline-block",
        verticalAlign: "bottom",
        maxWidth: "100%",
        margin: 0,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: theme.palette.mode === "dark" ? "#3a3b3c" : "#f0f2f5",
          color: theme.palette.text.primary,
          borderRadius: 2,
          px: 2,
          py: 1,
          maxWidth: "100%",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 1px 3px rgba(0,0,0,0.6)"
              : "0 1px 2px rgba(0,0,0,0.1)",
          verticalAlign: "bottom",
          margin: 0,
        }}
      >
        <Tooltip title="Скачать">
          <IconButton
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              mr: 1,
              color: theme.palette.primary.main,
            }}
          >
            <DownloadIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography
          variant="body2"
          noWrap
          sx={{
            flex: 1,
            fontWeight: 500,
            fontSize: 14,
            minWidth: 0,
          }}
          title={fileName}
        >
          {fileName}
        </Typography>

        <Tooltip title="Удалить">
          <IconButton
            size="small"
            onClick={deleteNode}
            sx={{
              ml: 1,
              color: theme.palette.grey[500],
              "&:hover": {
                color: theme.palette.error.main,
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>
    </NodeViewWrapper>
  );
}
