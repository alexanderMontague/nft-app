import React, { useState } from "react";
import {
  TextField,
  Button,
  Form,
  FormLayout,
  Checkbox,
} from "@shopify/polaris";

export function MintNFT() {
  const [inputs, setInputs] = useState<{
    assetLink: string;
    nftName: string;
    description: string;
  }>({
    assetLink: "",
    nftName: "",
    description: "",
  });

  const mintNFT = () => {
    console.log("minted");
  };

  const onChange = (
    id: "assetLink" | "nftName" | "description",
    text: string
  ) => {
    setInputs({ ...inputs, [id]: text });
  };

  return (
    <Form onSubmit={mintNFT}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={false}
          onChange={() => {}}
        />

        <TextField
          value={inputs.assetLink}
          onChange={text => onChange("assetLink", text)}
          label="Link to Asset"
          type="text"
        />

        <TextField
          value={inputs.nftName}
          onChange={text => onChange("nftName", text)}
          label="NFT Name"
          type="text"
        />

        <TextField
          value={inputs.description}
          onChange={text => onChange("description", text)}
          label="Description"
          type="text"
        />

        <Button primary submit>
          Submit
        </Button>
      </FormLayout>
    </Form>
  );
}
