import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai} clientId="347a1f6357f373a45d910c95ec77b350">
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  )
}
