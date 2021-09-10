import React, { useState } from "react";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Frame, Toast } from "@shopify/polaris";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

import "@shopify/polaris/dist/styles.css";

import { Home } from "./components";
import { UIcontext } from "./context";
import { useToast } from "./hooks";

function App() {
  const getLibrary = (provider: any, connector: any) => {
    return new ethers.providers.Web3Provider(provider);
  };

  const { toastInfo, setToast, closeToast } = useToast();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UIcontext.Provider value={{ toastInfo, setToast, closeToast }}>
        <AppProvider i18n={enTranslations}>
          <Frame>
            <Home />
            {toastInfo.active && (
              <Toast
                content={toastInfo.message}
                onDismiss={closeToast}
                error={toastInfo.error}
              />
            )}
          </Frame>
        </AppProvider>
      </UIcontext.Provider>
    </Web3ReactProvider>
  );
}

export default App;
