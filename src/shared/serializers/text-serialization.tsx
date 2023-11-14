import { FC, Fragment } from "react";
import { Box, Link, Typography } from "@mui/material";

export interface ITextSerialization {
  text?: string | null;
}

const TextSerialization: FC<ITextSerialization> = ({ text }) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const lines = text?.split("\n");

  return (
    <Box overflow="hidden">
      {lines?.map((line, i) => {
        const parts = line.split(linkRegex);
        return (
          <Typography variant="body2" key={i} sx={{ wordWrap: "break-word" }}>
            {parts.map((part, j) =>
              linkRegex.test(part) ? (
                <Link key={j} href={part} target="_blank" rel="noopener">
                  {part}
                </Link>
              ) : (
                <Fragment key={j}>{part}</Fragment>
              )
            )}
            <br />
          </Typography>
        );
      })}
    </Box>
  );
};

export default TextSerialization;
