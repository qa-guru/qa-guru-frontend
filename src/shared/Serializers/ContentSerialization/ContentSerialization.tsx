import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { IContentSerialization } from "./ContentSerialization.types";
import { style } from "./styles";
import TextSerialization from "../TextSerialization";

const ContentSerialization: React.FC<IContentSerialization> = ({ content }) => {
  return (
    <>
      {content?.map((item, index) => {
        const { value, url, type } = item!;

        switch (type) {
          case "title":
            return (
              <Typography key={index} variant="h5">
                {value}
              </Typography>
            );
          case "text":
            return <TextSerialization text={value!} key={index} />;
          case "video":
            return (
              <Box key={index} mb={3}>
                <Typography variant="h6">{value}</Typography>
                <Box sx={style.box}>
                  <iframe
                    // @ts-ignore
                    style={style.iframe}
                    src={`https://www.youtube.com/embed/${url}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </Box>
              </Box>
            );
          case "link":
            return (
              <Link
                key={index}
                underline="hover"
                href={url!}
                target="_blank"
                rel="noopener"
              >
                <Box mt={1}>{value}</Box>
              </Link>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default ContentSerialization;
