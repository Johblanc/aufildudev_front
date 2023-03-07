import React from "react";
import { DEFAULT_USER } from "../constant/visitor";
import { TUser } from "../navbar/types/TUser";

export const UserContext = React.createContext({
  user: DEFAULT_USER,
  setUser: (value: TUser) => {},
});
