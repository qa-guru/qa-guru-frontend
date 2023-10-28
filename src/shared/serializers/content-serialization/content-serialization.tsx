import { FC } from "react";
import { Box, Link, Typography } from "@mui/material";
import { IContentSerialization } from "./content-serialization.types";
import {
  StyledBox,
  StyledIframe,
  StyledIframeBox,
} from "./content-serialization.styled";
import TextSerialization from "../text-serialization";

const ContentSerialization: FC<IContentSerialization> = ({ content }) => {
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
            return <TextSerialization text={value} key={index} />;
          case "video":
            return (
              <StyledBox key={index}>
                <Typography variant="h6">{value}</Typography>
                <StyledIframeBox>
                  <StyledIframe
                    src={`https://www.youtube.com/embed/${url}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </StyledIframeBox>
              </StyledBox>
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
