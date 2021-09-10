import { createContext } from "react";

interface toastContent {
  message: string;
  error: boolean;
}

export const UIcontext = createContext({
  toastInfo: {
    active: false,
    message: "",
    error: false,
  },
  setToast: (toastInfo: toastContent) => {},
  closeToast: () => {},
});
