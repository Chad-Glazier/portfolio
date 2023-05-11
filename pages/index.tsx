import Head from "next/head"
import Image from "next/image"
import { Fira_Code } from "next/font/google"
import styles from "@/styles/Home.module.css"
import { animateText } from "@/lib"
import { useState } from "react"

const firaCode = Fira_Code({ subsets: ["latin"] })

export default function Home() {
  const [text, setText] = useState("Hello!")

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${firaCode.className}`}>
        <h1 onClick={
          () => {
            animateText(text, "Goodbye!", { onFrame: setText })
          }
        }>{text}</h1>
      </main>
    </>
  )
}
