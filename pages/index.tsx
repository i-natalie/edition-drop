// pages/index.tsx
import {
  MediaRenderer,
  useContract,
  useContractMetadata,
  useNFT,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const myEditionDropContractAddress = "0x8Dc21067Fefed800e844b2951A3f4DbD54c84037";

const Home: NextPage = () => {
  const { contract } = useContract(myEditionDropContractAddress, "edition-drop");
  const { data: contractMetadata } = useContractMetadata(contract);

  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");

  const [quantity0, setQuantity0] = useState(1);
  const [quantity1, setQuantity1] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);

  // Обработчик минтинга с типами
  const handleMint = async (tokenId: string, quantity: number) => {
    if (!contract) return;
    try {
      await contract.erc1155.claim(tokenId, quantity);
      const nft = tokenId === "0" ? nft0 : nft1;
      setMintedNFT(nft);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Ошибка при минтинге");
    }
  };

  // Обработчик кнопки "Поделиться в X"
  const handleShare = () => {
    if (!mintedNFT) return;
    const text = encodeURIComponent(`Я только что заминтил NFT "${mintedNFT.metadata.name}"! Посмотри:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{contractMetadata?.name || "Edition Drop"}</title>
        <meta name="description" content="Mint your NFT!" />
      </Head>

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
            <button onClick={() => handleMint("0", quantity0)}>Mint NFT 0</button>
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
            <button onClick={() => handleMint("1", quantity1)}>Mint NFT 1</button>
          </div>
        )}
      </div>

      {/* Модальное окно */}
      {modalOpen && mintedNFT && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setModalOpen(false)}>
              ×
            </span>
            <h2>
              Успешно заминтили NFT &quot;{mintedNFT.metadata.name}&quot;!
            </h2>
            <button className={styles.shareButton} onClick={handleShare}>
              Поделиться в X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
