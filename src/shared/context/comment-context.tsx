import React, { createContext, useContext, useState, ReactNode } from "react";

import { Maybe } from "api/graphql/generated/graphql";

interface CommentContextType {
  selectedComment: Maybe<string | undefined>;
  setSelectedComment: React.Dispatch<
    React.SetStateAction<Maybe<string | undefined>>
  >;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useComment = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
};

export const CommentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedComment, setSelectedComment] =
    useState<Maybe<string | undefined>>(null);

  return (
    <CommentContext.Provider value={{ selectedComment, setSelectedComment }}>
      {children}
    </CommentContext.Provider>
  );
};
