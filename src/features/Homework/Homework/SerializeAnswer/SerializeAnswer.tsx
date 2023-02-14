import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { ISerializeAnswer } from "./SerializeAnswer.types";

const SerializeAnswer: React.FC<ISerializeAnswer> = ({ answer }) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const lines = answer?.split("\n");

  return (
    <Box mt="16px">
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

export default SerializeAnswer;
