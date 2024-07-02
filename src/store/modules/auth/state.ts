import { StateAuth } from "@/types/auth";

export const initState = (): StateAuth => {
  return {
    accessToken: null,
  };
};
