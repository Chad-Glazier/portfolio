import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Home.module.css";
import theme from "@/styles/theme";

const styles = mergeStyles(theme.get("Home")!, pageStyles);

export default function Home() {
  return (
    <article className={styles.page}>
      <h1>Hi, My Name is Chad</h1>
      <p>This website is a work in progress!</p>
    </article>
  )
}
