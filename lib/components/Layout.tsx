import { ReactNode, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Nav from "./Nav";
import layoutStyle from "@/styles/components/Layout.module.css";
import theme from "@/styles/themes";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "300", subsets: [ "latin" ] });

export default function Layout({
  children,
  className,
  target
}: {
  children: ReactNode;
  className?: string;
  target?: string;
}) {
  const [pageName, setPageName] = useState("--");
  const onChangeHandler = useCallback((newPage: string) => setPageName(newPage), []);
  const pageTheme = (theme.get(pageName) ?? theme.get("Intro"))!;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav 
        onChange={onChangeHandler}
        target={target}
      />
      <main className={
        layoutStyle.main 
        + ` ${pageTheme.main}`
        + ` ${roboto.className}`
        + (className ? ` ${className}` : "")
      }>
        {children}
      </main>
    </>
  )
}