// pages/index.tsx
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useNFT,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { myEditionDropContractAddress } from "../const/yourDetails";
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(myEditionDropContractAddress, "edition-drop");
  const { data: contractMetadata } = useContractMetadata(contract);
  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");

  const [quantity0, setQuantity0] = useState(1);
  const [quantity1, setQuantity1] = useState(1);

  const [mintedNFT, setMintedNFT] = useState<null | { name: string }> (null);

  return (
    <div className={styles.container}>
      <Head>
        <title>{contractMetadata?.name || "Edition Drop"}</title>
        <meta name="description" content="Mint your NFT!" />
      </Head>

      {!address && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>Пожалуйста, подключите кошелёк.</p>
        </div>
      )}

      <h1 className={styles.title}>
        {contractMetadata?.name || "NFT Collection"}
      </h1>

      <div className={styles.grid}>
        {/* NFT 0 */}
        {nft0 && (
          <div className={styles.card}>
            <MediaRenderer src={nft0.metadata.image} width="100%" height="auto" />
            <h3>{nft0.metadata.name}</h3>
            <p>{nft0.metadata.description}</p>

            <input
              type="number"
              value={quantity0}
              min={1}
              onChange={(e) => setQuantity0(Number(e.target.value))}
              className={styles.input}
            />

            <Web3Button
              contractAddress={myEditionDropContractAddress}
              action={async (contract) => {
                await contract.erc1155.claim("0", quantity0);
                setMintedNFT({ name: nft0.metadata.name });
              }}
            >
              Mint NFT 0
            </Web3Button>
          </div>
        )}

        {/* NFT 1 */}
        {nft1 && (
          <div className={styles.card}>
            <MediaRenderer src={nft1.metadata.image} width="100%" height="auto" />
            <h3>{nft1.metadata.name}</h3>
            <p>{nft1.metadata.description}</p>

            <input
              type="number"
              value={quantity1}
              min={1}
              onChange={(e) => setQuantity1(Number(e.target.value))}
              className={styles.input}
            />

            <Web3Button
              contractAddress={myEditionDropContractAddress}
              action={async (contract) => {
                await contract.erc1155.claim("1", quantity1);
                setMintedNFT({ name: nft1.metadata.name });
              }}
            >
              Mint NFT 1
            </Web3Button>
          </div>
        )}
      </div>

      {/* Модальное окно успешного минта */}
      {mintedNFT && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
          zIndex: 2000,
          textAlign: "center",
        }}>
          <h2>Успешный минтинг!</h2>
          <p>Вы заминтили: <strong>{mintedNFT.name}</strong></p>
          <button
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: "#1DA1F2",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              const text = encodeURIComponent(`Я только что заминтил NFT "${mintedNFT.name}"! Посмотри:`);
              const url = encodeURIComponent(window.location.href);
              window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
            }}
          >
            Поделиться в X
          </button>
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => setMintedNFT(null)}
              style={{ background: "none", border: "none", color: "#555", cursor: "pointer" }}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
