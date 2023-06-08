import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Resume.module.css";
import theme from "@/styles/theme";

const styles = mergeStyles(theme.get("Resume")!, pageStyles);

export default function Resume() {
  return (
    <article className={styles.page}>
      <h1 className={styles.heading}>Resume</h1>
    </article>
  )
}
