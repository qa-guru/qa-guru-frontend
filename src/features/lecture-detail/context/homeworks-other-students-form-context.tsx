import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  Maybe,
  Order,
  StudentHomeWorkStatus,
} from "api/graphql/generated/graphql";

interface IHomeworksFormProvider {
  children: ReactNode;
}

interface IHomeworksFormContext {
  status: Maybe<StudentHomeWorkStatus>;
  setStatus: Dispatch<SetStateAction<Maybe<StudentHomeWorkStatus>>>;
  sortOrder: Maybe<Order>;
  setSortOrder: Dispatch<SetStateAction<Maybe<Order>>>;
}

export const HomeworksOtherStudentsFormContext =
  createContext<IHomeworksFormContext>({
    status: null,
    setStatus: () => {},
    sortOrder: null,
    setSortOrder: () => {},
  });

export const useHomeworksForm = () => {
  const context = useContext(HomeworksOtherStudentsFormContext);
  if (!context) {
    throw new Error("useKanbanForm must be used within a KanbanFormProvider");
  }
  return context;
};

export const HomeworksFormProvider: FC<IHomeworksFormProvider> = ({
  children,
}) => {
  const [status, setStatus] = useState<Maybe<StudentHomeWorkStatus>>(null);
  const [sortOrder, setSortOrder] = useState<Maybe<Order>>(null);

  return (
    <HomeworksOtherStudentsFormContext.Provider
      value={{
        status,
        setStatus,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </HomeworksOtherStudentsFormContext.Provider>
  );
};
