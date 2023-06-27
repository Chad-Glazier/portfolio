import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Contact.module.css";
import theme from "@/styles/themes";
import Image from "next/image";
import Link from "next/link";

const styles = mergeStyles(theme.get("Contact")!, pageStyles);

export default function Contact() {
  return (
    <article className={styles.page}>
      <Image
        className={styles.headshot}
        src="/headshot.jpg"
        height={300}
        width={300}
        alt="A picture of me!"
      />
      <div
        className={styles.info}
      >
        <section
          className={styles.socials}
        >
          <Link
            href="https://www.linkedin.com/in/chad-glazier-4b585a257?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BiTFTt1cyT7OFkyvs9OdR2g%3D%3D"
            target="_blank"
          >
            <Image
              className={styles.linkedInLink}
              src="/linkedin.png"
              alt="Click here to visit my LinkedIn Page!"
              width={30}
              height={30}
            />          
          </Link>
          <Link
            href="https://github.com/Chad-Glazier"
            target="_blank"
          >
            <Image
              className={styles.githubLink}
              src="/github.svg"
              alt="Click here to visit my Github!"
              width={30}
              height={30}
            />          
          </Link>
        </section>
        <table className={styles.contactInfo}>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </article>
  )
}
