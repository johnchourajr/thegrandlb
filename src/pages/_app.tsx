import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <p className={"text-headline-lg"}>
        <Link href="/">The Grand LB</Link>
      </p>
      <Component {...pageProps} />
    </>
  );
}
