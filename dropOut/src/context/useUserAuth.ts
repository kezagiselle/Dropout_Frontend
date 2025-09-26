import { useContext } from "react";
import { UserAuthContext } from "./UserAuthContext";

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("useUserAuth must be used within UserAuthProvider");
  return context;
};
