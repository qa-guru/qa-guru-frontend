import { FC } from "react";
import { RichTextReadOnly } from "shared/lib/mui-tiptap";
import { Maybe } from "api/graphql/generated/graphql";
import { FormControl } from "@mui/material";

import useExtensions from "../hooks/use-extensions";

interface TextViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: Maybe<any>;
}

const TextView: FC<TextViewProps> = ({ content }) => {
  const extensions = useExtensions();

  return (
    <FormControl sx={{ wordBreak: "break-word" }}>
      <RichTextReadOnly content={content} extensions={extensions} />
    </FormControl>
  );
};

export default TextView;
