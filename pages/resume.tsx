import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Resume.module.css";
import theme from "@/styles/theme";
import Image from "next/image";

const styles = mergeStyles(theme.get("Resume")!, pageStyles);

export default function Resume() {
  return (
    <article className={styles.page}>
      <section>
        
      </section>
    </article>
  )
}
