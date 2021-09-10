import React, { useState, useCallback, useContext, useEffect } from "react";
import { Page, Card, Tabs, Toast } from "@shopify/polaris";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { ethers } from "ethers";

import { injectedConnector } from "../connectors";
import { MintNFT } from ".";
import { UIcontext } from "../context";
import { connect } from "http2";

export function Home() {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    setError,
    error,
  } = useWeb3React();

  const { setToast } = useContext(UIcontext);

  useEffect(() => {
    console.log("account", active, account, library, chainId);
    onLoad();
  }, []);

  const onLoad = async () => {
    const isAuth = await injectedConnector.isAuthorized();
    if (isAuth) {
      activate(injectedConnector);
    }
  };

  useEffect(() => {
    if (error) {
      console.log("ERROR", error);
      setToast({ message: getErrorMessage(error), error: true });
    }
  }, [error]);

  const connectWallet = async () => {
    await activate(injectedConnector);
  };

  const disconnectWallet = () => {
    deactivate();
  };

  const getErrorMessage = (error: Error) => {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else if (error instanceof UnsupportedChainIdError) {
      return "You're connected to an unsupported network.";
    } else if (error instanceof UserRejectedRequestErrorInjected) {
      return "Please authorize this website to access your Ethereum account.";
    } else {
      console.error(error);
      return "An unknown error occurred. Check the console for more details.";
    }
  };

  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    selectedTabIndex => setSelected(selectedTabIndex),
    []
  );
  const tabs = [
    {
      id: "mintNFT",
      content: "Mint NFT",
      component: <MintNFT />,
    },
    {
      id: "ViewNFT",
      content: "View NFT",
      component: <div>view nft</div>,
    },
    {
      id: "debug",
      content: "Debug Contract",
      component: <div>debug</div>,
    },
  ];

  return (
    <Page
      title="NFT App"
      primaryAction={
        !active
          ? {
              content: "Connect Wallet 🦊",
              onAction: connectWallet,
            }
          : {
              content: "Disconnect Wallet",
              onAction: disconnectWallet,
              destructive: true,
            }
      }
    >
      <Card sectioned>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section title={tabs[selected].content}>
            {tabs[selected].component}
          </Card.Section>
        </Tabs>
      </Card>
    </Page>
  );
}
