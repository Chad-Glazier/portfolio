import styles from "@/styles/pages/404.module.css";
import { Layout } from "@/lib";

export default function NotFound() {
  return (
    <Layout className={styles.page}>
      <h1>404</h1>
      <p>Page not found.</p>
    </Layout>
  )
}