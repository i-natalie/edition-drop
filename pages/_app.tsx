import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "../components/Navbar";

const queryClient = new QueryClient();

const clientId = undefined;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider activeChain={Sepolia}>
        <Head>
          <title>thirdweb Edition Drop Minting Customizable Page</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta
            name="description"
            content="Learn How To Use Thirdweb's Edition Drop contract and create a customizable Edition Drop minting page"
          />
        </Head>
        <Navbar /> {/* Добавили вот сюда */}
        <Component {...pageProps} />
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
