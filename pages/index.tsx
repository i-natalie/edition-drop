import { ConnectWallet, Web3Button, useContract, useNFT, useContractMetadata } from "@thirdweb-dev/react";
import { useState } from "react";

export default function Home() {
  const { contract } = useContract("0x8Dc21067Fefed800e844b2951A3f4DbD54c84037", "edition-drop");
  const { data: metadata } = useContractMetadata(contract);
  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");

  const [mintedNFT, setMintedNFT] = useState<null | { name: string; tokenId: string }>(null);

  const shareText = mintedNFT
    ? mintedNFT.tokenId === "0"
      ? "Я только что получил NFT #0! Проверь и ты!"
      : "Я только что получил NFT #1! Успей и ты!"
    : "";

  const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window?.location.href)}`;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{metadata?.name || "NFT Коллекция"}</h1>
        <ConnectWallet />
      </div>

      <div style={{ marginTop: "40px", display: "flex", gap: "40px" }}>
        {nft0 && (
          <div>
            <h2>{nft0.metadata.name}</h2>
            <img src={nft0.metadata.image} alt={nft0.metadata.name} width={200} />
            <Web3Button
              contractAddress={contract?.getAddress() || ""}
              action={async (contract) => {
                await contract.erc1155.claim("0", 1);
                setMintedNFT({ name: nft0.metadata.name || "", tokenId: "0" });
              }}
            >
              Минт NFT 0
            </Web3Button>

            {mintedNFT?.tokenId === "0" && (
              <>
                <p>Успешно заминчено!</p>
                <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                  <button>Поделиться в X</button>
                </a>
              </>
            )}
          </div>
        )}

        {nft1 && (
          <div>
            <h2>{nft1.metadata.name}</h2>
            <img src={nft1.metadata.image} alt={nft1.metadata.name} width={200} />
            <Web3Button
              contractAddress={contract?.getAddress() || ""}
              action={async (contract) => {
                await contract.erc1155.claim("1", 1);
                setMintedNFT({ name: nft1.metadata.name || "", tokenId: "1" });
              }}
            >
              Минт NFT 1
            </Web3Button>

            {mintedNFT?.tokenId === "1" && (
              <>
                <p>Успешно заминчено!</p>
                <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                  <button>Поделиться в X</button>
                </a>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
