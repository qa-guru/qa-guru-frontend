import React, { createContext, useContext } from "react";
import { UserRole } from "../../../api/graphql/generated/graphql";

interface UserContextType {
  userId?: string | null | undefined;
  userRoles?: Array<UserRole | null> | null | undefined;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  userId?: string | null | undefined;
  userRoles?: Array<UserRole | null> | null | undefined;
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({
  userId,
  userRoles,
  children,
}) => {
  return (
    <UserContext.Provider value={{ userId, userRoles }}>
      {children}
    </UserContext.Provider>
  );
};
