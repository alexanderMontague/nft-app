import React, { useState } from "react";

interface toastContent {
  message: string;
  error: boolean;
}

function useToast() {
  const [toastTimerID, setToastTimerID] = useState(0);
  const [toastInfo, setToastInfo] = useState({
    active: false,
    message: "",
    error: false,
  });

  const setToast = (toastInfo: toastContent) => {
    setToastInfo({ active: true, ...toastInfo });
    const timerID = Number(
      setTimeout(() => {
        setToastInfo({ active: false, message: "", error: false });
      }, 5000)
    );
    setToastTimerID(timerID);
  };

  const closeToast = () => {
    clearTimeout(toastTimerID);
    setToastInfo({ active: false, message: "", error: false });
  };

  return {
    toastInfo,
    setToast,
    closeToast,
  };
}

export default useToast;
