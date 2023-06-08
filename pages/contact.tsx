import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Contact.module.css";
import theme from "@/styles/theme";

const styles = mergeStyles(theme.get("Contact")!, pageStyles);

export default function Contact() {
  return (
    <article className={styles.page}>
      <h1>Contact</h1>
      <table>
        <thead>

        </thead>
      </table>
    </article>
  )
}
