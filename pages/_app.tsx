import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThirdwebGuideFooter } from "../components/ThirdwebGuideFooter";

const queryClient = new QueryClient();

const clientId = "вставь_сюда_свой_Client_ID_из_Thirdweb";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider activeChain={Sepolia} clientId={clientId}>
        <Head>
          <title>thirdweb Edition Drop Minting Customizable Page</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content="Learn How To Use Thirdweb's Edition Drop contract and create a customizable Edition Drop minting page"
          />
        </Head>
        <Component {...pageProps} />
        <ThirdwebGuideFooter />
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
