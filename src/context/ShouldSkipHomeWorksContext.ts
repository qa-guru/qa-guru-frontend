import { createContext, Dispatch, SetStateAction } from "react";

interface IShouldSkipHomeWorksContext {
  shouldSkipHomeWorks: boolean;
  setShouldSkipHomeWorks: Dispatch<SetStateAction<boolean>>;
}

export const ShouldSkipHomeWorksContext =
  createContext<IShouldSkipHomeWorksContext>({
    shouldSkipHomeWorks: false,
    setShouldSkipHomeWorks: () => {},
  });
