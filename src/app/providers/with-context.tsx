import { ReactNode } from "react";
import { CommentProvider } from "shared/context/comment-context";

export const withContext = (component: () => ReactNode) => {
  return function WithContextComponent() {
    return <CommentProvider>{component()}</CommentProvider>;
  };
};
