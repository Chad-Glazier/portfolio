import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Contact.module.css";
import theme from "@/styles/theme";
import Image from "next/image";
import Link from "next/link";

const styles = mergeStyles(theme.get("Contact")!, pageStyles);

export default function Contact() {
  return (
    <article className={styles.page}>
      <h1>Contact</h1>
      <Image
        className={styles.headshot}
        src="/headshot.jpg"
        height={300}
        width={300}
        alt="A picture of me!"
      />
      <table className={styles.contactInfo}>
        <tr>
          <th>Email</th>
          <td>
            <Link href="mailto:chadglazier@outlook.com" target="_blank">
              chadglazier@outlook.com
            </Link>
          </td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>
            (250) 241-4039
          </td>
        </tr>
        <tr>
          <th>Location</th>
          <td>
            <Link href="https://goo.gl/maps/839DwLLUU2yUMRAC8" target="_blank">
              Kelowna, BC
            </Link>
          </td>
        </tr>
      </table>
    </article>
  )
}
