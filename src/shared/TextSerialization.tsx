import React from "react";
import { Box, Link, Typography } from "@mui/material";

export interface ITextSerialization {
  text: string;
}

const TextSerialization: React.FC<ITextSerialization> = ({ text }) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const lines = text?.split("\n");

  return (
    <Box overflow="hidden">
      {lines?.map((line, i) => {
        const parts = line.split(linkRegex);
        return (
          <Typography variant="subtitle1" key={i}>
            {parts.map((part, j) =>
              linkRegex.test(part) ? (
                <Link key={j} href={part} target="_blank" rel="noopener">
                  {part}
                </Link>
              ) : (
                <React.Fragment key={j}>{part}</React.Fragment>
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
