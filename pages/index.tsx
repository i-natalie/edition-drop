// pages/index.tsx

import {
  useAddress,
  useContract,
  useNFT,
  useClaimNFT,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { useState } from "react";

const contractAddress = "0x2e8Ce20dB72850bC63B8dc362Dd89AC99c1aB7F5";

export default function Home() {
  const address = useAddress();
  const { contract } = useContract(contractAddress, "edition-drop");

  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");

  const { mutateAsync: claimNFT0, isLoading: loading0 } = useClaimNFT(contract);
  const { mutateAsync: claimNFT1, isLoading: loading1 } = useClaimNFT(contract);

  const [quantity0] = useState(1);
  const [quantity1] = useState(1);

  const [mintedNFT, setMintedNFT] = useState<{ name: string } | null>(null);

  const handleShare = () => {
    if (!mintedNFT?.name) return;

    const baseText =
      mintedNFT.name === "NFT 0"
        ? "Я только что заминтил NFT 0!"
        : "Я только что заминтил NFT 1!";
    const url = "https://edition-drop-i-natalie.vercel.app/";

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      ${baseText} ${url}`
    )};

    window.open(shareUrl, "_blank");
  };

  const handleCloseMessage = () => {
    setMintedNFT(null);
  };

  return (
    <main style={{ padding: "100px 20px 40px", textAlign: "center" }}>
      <h1>Минтинг NFT</h1>

      {!address && (
        <div style={{ marginTop: "20px" }}>
          <ConnectWallet />
        </div>
      )}

      {address && (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", alignItems: "center", marginTop: "40px" }}>
          {/* NFT 0 */}
          {nft0 && (
            <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "12px", maxWidth: "400px" }}>
              <img src={nft0.metadata.image} alt={nft0.metadata.name || "NFT 0"} style={{ width: "100%", borderRadius: "8px" }} />
              <h2>{nft0.metadata.name}</h2>
              <p>{nft0.metadata.description}</p>
              <button
                disabled={loading0}
                onClick={async () => {
                  await claimNFT0({ to: address, tokenId: "0", quantity: quantity0 });
                  setMintedNFT({ name: nft0.metadata.name ?? "NFT 0" });
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                {loading0 ? "Минтим..." : "Минт NFT 0"}
              </button>
            </div>
          )}

          {/* NFT 1 */}
          {nft1 && (
            <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "12px", maxWidth: "400px" }}>
              <img src={nft1.metadata.image} alt={nft1.metadata.name || "NFT 1"} style={{ width: "100%", borderRadius: "8px" }} />
              <h2>{nft1.metadata.name}</h2>
              <p>{nft1.metadata.description}</p>
              <button
                disabled={loading1}
                onClick={async () => {
                  await claimNFT1({ to: address, tokenId: "1", quantity: quantity1 });
                  setMintedNFT({ name: nft1.metadata.name ?? "NFT 1" });
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                {loading1 ? "Минтим..." : "Минт NFT 1"}
              </button>
            </div>
          )}
        </div>
      )}
      {/* Уведомление об успешном минтинге */}
      {mintedNFT && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            textAlign: "center",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <button
            onClick={handleCloseMessage}
            style={{
              position: "absolute",
              top: "8px",
              right: "12px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#999",
            }}
            aria-label="Закрыть"
          >
            ×
          </button>

          <h3>Вы успешно заминтили {mintedNFT.name}!</h3>
          <button
            onClick={handleShare}
            style={{
              marginTop: "16px",
              padding: "10px 20px",
              backgroundColor: "#1DA1F2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Поделиться в X
          </button>
        </div>
      )}
    </main>
  );
}
