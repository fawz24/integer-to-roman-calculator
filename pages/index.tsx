import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import { IntegerToRomanCalculator } from "@/components/IntegerToRomanCalculator";

const title = "Integer to Roman Numeral Calculator";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>{title}</h1>
        <IntegerToRomanCalculator min={1} max={1000}></IntegerToRomanCalculator>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
