import { ReactNode, useState } from "react";
import Head from "next/head";
import Nav from "./Nav";
import layoutStyle from "@/styles/components/Layout.module.css";
import theme from "@/styles/theme";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "300", subsets: [ "latin" ] });

export default function Layout({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const [pageName, setPageName] = useState("--");
  const pageTheme = (theme.get(pageName) ?? theme.get("Home"))!;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav 
        className={pageTheme.nav}
        onChange={(newPage) => setPageName(newPage)} 
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