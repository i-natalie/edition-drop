import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useNFT,
} from "@thirdweb-dev/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const address = useAddress();
  const { contract } = useContract("0x8Dc21067Fefed800e844b2951A3f4DbD54c84037", "edition-drop");
  const { data: metadata } = useContractMetadata(contract);
  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");
  const [mintedNFT, setMintedNFT] = useState<{ name: string; tokenId: string } | null>(null);

  return (
    <div className={styles.container}>
      {/* Единственная кнопка Connect Wallet */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <ConnectWallet />
      </div>

      {/* Название коллекции строго из метаданных */}
      {metadata && <h1 style={{ marginTop: 60 }}>{metadata.name}</h1>}

      {/* NFT-карточки, только если кошелек подключен */}
      {address && (
        <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
          {nft0 && (
            <div>
              <MediaRenderer src={nft0.metadata.image} width="200px" height="200px" />
              <p>{nft0.metadata.name}</p>
              <Web3Button
                contractAddress="0x8Dc21067Fefed800e844b2951A3f4DbD54c84037"
                action={async (contract) => {
                  await contract.erc1155.claim("0", 1);
                  setMintedNFT({ name: String(nft0.metadata.name), tokenId: "0" });
                }}
              >
                Минт NFT 0
              </Web3Button>
            </div>
          )}
          {nft1 && (
            <div>
              <MediaRenderer src={nft1.metadata.image} width="200px" height="200px" />
              <p>{nft1.metadata.name}</p>
              <Web3Button
                contractAddress="0x8Dc21067Fefed800e844b2951A3f4DbD54c84037"
                action={async (contract) => {
                  await contract.erc1155.claim("1", 1);
                  setMintedNFT({ name: String(nft1.metadata.name), tokenId: "1" });
                }}
              >
                Минт NFT 1
              </Web3Button>
            </div>
          )}
        </div>
      )}

      {/* Кнопка "Поделиться", если успешно заминтили */}
      {mintedNFT && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            padding: "20px",
            zIndex: 1000,
            border: "1px solid #ccc",
          }}
        >
          <div
            onClick={() => setMintedNFT(null)}
            style={{
              position: "absolute",
              top: 5,
              right: 10,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ×
          </div>
          <p>Вы успешно заминтили {mintedNFT.name}</p>
          <a
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(
              `Я только что заминтил ${mintedNFT.name}! Получи свою: https://edition-drop-natalie.vercel.app/`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Поделиться в X
          </a>
        </div>
      )}
    </div>
  );
}
