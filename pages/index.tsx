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
import { useState } from "react";

const myEditionDropContractAddress = "0x8Dc21067Fefed800e844b2951A3f4DbD54c84037";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(myEditionDropContractAddress, "edition-drop");
  const { data: contractMetadata } = useContractMetadata(contract);

  const { data: nft0 } = useNFT(contract, "0");
  const { data: nft1 } = useNFT(contract, "1");

  const [quantity0, setQuantity0] = useState(1);
  const [quantity1, setQuantity1] = useState(1);
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);

  const getTweetText = (tokenId: string) => {
    if (tokenId === "0") {
      return encodeURIComponent("Я только что заминтил NFT #0! Проверь сам: https://your-mint-site.com");
    } else if (tokenId === "1") {
      return encodeURIComponent("Я только что заминтил NFT #1! Загляни: https://your-mint-site.com");
    }
    return encodeURIComponent("Я только что заминтил NFT! Посмотри: https://your-mint-site.com");
  };

  const renderShareButton = () => {
    if (!mintedTokenId) return null;
    const tweetText = getTweetText(mintedTokenId);
    return (
      <a
        href={`https://twitter.com/intent/tweet?text=${tweetText}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.shareButton}
      >
        Поделиться в X
      </a>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{contractMetadata?.name || "Edition Drop"}</title>
        <meta name="description" content="Mint your NFT!" />
      </Head>

      <h1>{contractMetadata?.name}</h1>

      <div className={styles.nftBox}>
        {nft0 && (
          <div className={styles.nftItem}>
            <MediaRenderer src={nft0.metadata.image} />
            <h3>{nft0.metadata.name}</h3>
            <Web3Button
              contractAddress={myEditionDropContractAddress}
              action={(contract) => contract.erc1155.claim("0", quantity0)}
              onSuccess={() => setMintedTokenId("0")}
            >
              Mint NFT 0
            </Web3Button>
          </div>
        )}

        {nft1 && (
          <div className={styles.nftItem}>
            <MediaRenderer src={nft1.metadata.image} />
            <h3>{nft1.metadata.name}</h3>
            <Web3Button
              contractAddress={myEditionDropContractAddress}
              action={(contract) => contract.erc1155.claim("1", quantity1)}
              onSuccess={() => setMintedTokenId("1")}
            >
              Mint NFT 1
            </Web3Button>
          </div>
        )}
      </div>

      {renderShareButton()}
    </div>
  );
};

export default Home;
