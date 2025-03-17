import { AuthUserType } from "./AuthUserType";
import { Dispatch, SetStateAction } from "react";

export type AuthContextType = {
  authUser: AuthUserType | null;
  setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
  isLoading: boolean;
}