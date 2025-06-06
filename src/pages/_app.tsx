import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { AuthProvider } from "@/components/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Digital Kudos Wall</title>
        <meta
          name="description"
          content="A platform for public recognition and appreciation among colleagues"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <AuthProvider>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </>
  );
}
