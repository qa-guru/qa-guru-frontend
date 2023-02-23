import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { IContent } from "./Content.types";
import TextSerialization from "../TextSerialization";

const style = {
  box: {
    overflow: "hidden",
    paddingBottom: "40.25%",
    position: "relative",
    height: 0,
  },
  iframe: {
    left: 0,
    top: 0,
    height: "100%",
    width: "70%",
    position: "absolute",
  },
};

const Content: React.FC<IContent> = ({ content }) => {
  return (
    <>
      {content?.map((item, index) => {
        const { value, url, type } = item!;

        switch (type) {
          case "title":
            return (
              <Typography key={index} variant="h6">
                {value}
              </Typography>
            );
          case "text":
            return <TextSerialization text={value!} key={index} />;
          case "video":
            return (
              <Box key={index}>
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
                {value}
              </Link>
            );
        }
      })}
    </>
  );
};

export default Content;
