import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "@components/Link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={"p-10"}>
      <p className={"text-headline-lg"}>
        <Link href="/">The Grand LB</Link>
      </p>
      <Component {...pageProps} />
    </div>
  );
}
