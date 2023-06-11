import "@/styles/globals.css"
import type { AppProps } from "next/app";
import { Layout } from "@/lib";
import { Fira_Code } from "next/font/google";
import { useState } from "react";

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const [target, setTarget] = useState<string | undefined>(undefined);

  return (
    <main className={firaCode.className}>
      <Layout target={target}>
        <Component {...pageProps} navigateTo={(newTarget: string) => { 
          setTarget(newTarget); 
          /**
           * This is here for a good reason, to explain it you must know two things:
           * 
           * -  the `target` only updates when the page component invokes `navigateTo`, and
           * -  the page can be changed without changing the target, via the `Layout`'s `Nav`.
           * 
           * Therefore, an edge case is created where the page component updates the `target`,
           * then navigates elsewhere via the `Nav` (which doesn't update the `target`), and
           * then when they try to invoke `navigateTo` on the previous target, React doesn't
           * detect a change (because the `target` is being set to the value it already held).
           * 
           * By resetting `target` to `undefined` (which doesn't cause a navigation), this edge
           * case is avoided.
           */
          setTimeout(() => setTarget(undefined), 10) 
        }} />
      </Layout>
    </main>
  );
}
