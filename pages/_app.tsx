import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import AppProvider from "../provider/app.provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}
