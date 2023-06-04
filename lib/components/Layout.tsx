import styles from "@/styles/components/Layout.module.css";
import { ReactNode } from "react";
import Head from "next/head";
import { animateText } from "@/lib";

export default function Layout({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main + (className ? ` ${className}` : "")}>
        {children}
      </main>
    </>
  )
}