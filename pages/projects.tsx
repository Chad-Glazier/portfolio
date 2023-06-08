import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Projects.module.css";
import theme from "@/styles/theme";

const styles = mergeStyles(theme.get("Projects")!, pageStyles);

export default function Projects() {
  return (
    <article className={styles.page}>
      <h1>Projects</h1>
    </article>
  );
}