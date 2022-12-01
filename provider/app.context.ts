import { User } from "@prisma/client";
import { createContext, useContext } from "react";

export interface ContextInterface {
  data: { username: string; password: string };
  handleUsername: (username: string) => void;
  handlePassword: (password: string) => void;
  submit: (e: any) => void,
  check: (e: any) => void,
  message: string|null,
  errors: string[]|null,
  loading: boolean,
  user: User|null|undefined
}

export const AppContext = createContext<null | ContextInterface>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Must be within context scope");
  return context;
};
