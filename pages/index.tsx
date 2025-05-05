// pages/index.tsx

import { useAddress, useContract, useNFT, Web3Button, ConnectWallet } from "@thirdweb-dev/react";
import { useState } from "react";

const contractAddress = "0x8Dc21067Fefed800e844b2951A3f4DbD54c84037";

export default function Home() {
  const address = useAddress();
  const { contract, isLoading: isContractLoading } = useContract(contractAddress, "edition-drop");
  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");

  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);

  const shareText = mintedTokenId === "0"
    ? "Я только что заминтил NFT #0!"
    : mintedTokenId === "1"
    ? "Я только что заминтил NFT #1!"
    : "";

  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{contract?.metadata?.name || "NFT Коллекция"}</h1>
        <ConnectWallet />
      </div>

      {!address && <p>Пожалуйста, подключите кошелёк</p>}

      {address && (
        <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
          {[nft0, nft1].map((nft, index) => (
            nft && (
              <div key={index} style={{ border: "1px solid #ccc", borderRadius: 10, padding: 20, width: 300 }}>
                <h2>{String(nft.metadata.name) || NFT ${index}}</h2>
                {typeof nft.metadata.image === "string" && (
                  <img
                    src={String(nft.metadata.image)}
                    alt={String(nft.metadata.name || NFT ${index})}
                    width={200}
                  />
                )}
                <Web3Button
                  contractAddress={contract?.getAddress() || ""}
                  action={async (contract) => {
                    await contract.erc1155.claim(index, 1);
                    setMintedTokenId(index.toString());
                  }}
                >
                  МИНТИТЬ
                </Web3Button>

                {mintedTokenId === index.toString() && (
                  <div style={{ marginTop: 10 }}>
                    <p>Успешно заминчено!</p>
                    <a
                      href={shareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: 5,
                        background: "#1DA1F2",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: 5,
                        textDecoration: "none",
                      }}
                    >
                      Поделиться в X
                    </a>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
