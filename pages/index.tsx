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
  const [minted0, setMinted0] = useState(false);
  const [minted1, setMinted1] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>{contractMetadata?.name ?? "Edition Drop"}</title>
        <meta name="description" content="Mint your NFT!" />
      </Head>

      <h1 className={styles.title}>
        {contractMetadata?.name ?? "NFT Collection"}
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
                setMinted0(true);
              }}
            >
              Mint NFT 0
            </Web3Button>

            {minted0 && (
              <button
                className={styles.shareButton}
                onClick={() => {
                  const text = encodeURIComponent(Я только что заминтил NFT "${nft0.metadata.name}"! Посмотри:);
                  const url = encodeURIComponent(window.location.href);
                  window.open(https://twitter.com/intent/tweet?text=${text}&url=${url}, "_blank");
                }}
              >
                Поделиться в X
              </button>
            )}
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
                setMinted1(true);
              }}
            >
              Mint NFT 1
            </Web3Button>

            {minted1 && (
              <button
                className={styles.shareButton}
                onClick={() => {
                  const text = encodeURIComponent(Я только что заминтил NFT "${nft1.metadata.name}"! Посмотри:);
                  const url = encodeURIComponent(window.location.href);
                  window.open(https://twitter.com/intent/tweet?text=${text}&url=${url}, "_blank");
                }}
              >
                Поделиться в X
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
