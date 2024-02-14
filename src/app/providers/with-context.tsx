import { ReactNode } from "react";
import { CommentProvider } from "shared/context/comment-context";
import SettingsProvider from "shared/context/setting-context";

export const withContext = (component: () => ReactNode) => {
  return function WithContextComponent() {
    return (
      <SettingsProvider>
        <CommentProvider>{component()}</CommentProvider>
      </SettingsProvider>
    );
  };
};
