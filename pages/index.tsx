import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const address = useAddress();
  const { contract } = useContract("0x8Dc21067Fefed800e844b2951A3f4DbD54c84037", "edition-drop");

  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");

  const [mintedNFT, setMintedNFT] = useState<{ name: string; tokenId: string } | null>(null);

  const renderShareMessage = (tokenId: string) => {
    if (tokenId === "0") {
      return "Я только что заминтил NFT #0! Посмотри и ты!";
    } else if (tokenId === "1") {
      return "Я только что заминтил NFT #1! Присоединяйся!";
    }
    return "Я только что заминтил NFT!";
  };

  const renderMintSuccess = () => {
    if (!mintedNFT) return null;

    const shareText = encodeURIComponent(renderShareMessage(mintedNFT.tokenId));
    const shareURL = `https://twitter.com/intent/tweet?text=${shareText}`;

    return (
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        zIndex: 1000,
        textAlign: "center"
      }}>
        <button
          onClick={() => setMintedNFT(null)}
          style={{
            position: "absolute",
            top: "8px",
            right: "12px",
            background: "transparent",
            border: "none",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          &times;
        </button>
        <p>Минтинг прошел успешно: {mintedNFT.name}</p>
        <a
          href={shareURL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "10px 16px",
            backgroundColor: "#1DA1F2",
            color: "#fff",
            borderRadius: "4px",
            textDecoration: "none"
          }}
        >
          Поделиться в X
        </a>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1>Мой NFT Минтинг</h1>
      <ConnectWallet />

      <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
        {/* NFT 0 */}
        {nft0 && (
          <div>
            <MediaRenderer src={nft0.metadata.image} height="200px" />
            <p>{nft0.metadata.name}</p>
            <Web3Button
              contractAddress="0x8Dc21067Fefed800e844b2951A3f4DbD54c84037"
              action={async (contract) => {
                await contract.erc1155.claim("0", 1);
                setMintedNFT({ name: String(nft0.metadata.name ?? ""), tokenId: "0" });
              }}
            >
              Минт NFT 0
            </Web3Button>
          </div>
        )}

        {/* NFT 1 */}
        {nft1 && (
          <div>
            <MediaRenderer src={nft1.metadata.image} height="200px" />
            <p>{nft1.metadata.name}</p>
            <Web3Button
              contractAddress="0x8Dc21067Fefed800e844b2951A3f4DbD54c84037"
              action={async (contract) => {
                await contract.erc1155.claim("1", 1);
                setMintedNFT({ name: String(nft1.metadata.name ?? ""), tokenId: "1" });
              }}
            >
              Минт NFT 1
            </Web3Button>
          </div>
        )}
      </div>

      {renderMintSuccess()}
    </div>
  );
}
