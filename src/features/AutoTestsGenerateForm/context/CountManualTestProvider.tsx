import { createContext, useState } from "react";
import { ICountManualTestProvider } from "./CountManualTestProvider.types";

export const CountManualTestContext = createContext<any>(null);

const CountManualTestProvider: React.FC<ICountManualTestProvider> = ({
  children,
}) => {
  const [countManualTest, setCountManualTest] = useState();

  return (
    <CountManualTestContext.Provider
      value={[countManualTest, setCountManualTest]}
    >
      {children}
    </CountManualTestContext.Provider>
  );
};

export default CountManualTestProvider;
