import mergeStyles from "@/lib/functions/mergeStyles";
import pageStyles from "@/styles/pages/Intro.module.css";
import theme from "@/styles/themes";
import Image from "next/image";
import Link from "next/link";

const styles = mergeStyles(theme.get("Intro")!, pageStyles);

export default function Intro({
  navigateTo
}: {
  navigateTo: (newTarget: string) => void
}) {
  return (
    <article className={styles.page}>
      <section
        className={styles.intro}
      >
        <div
          className={styles.summary}
        >
          <h1 className={styles.title}>
            My name is 
            <br />
            <span className={styles.name + " " + styles.emphasis}>
              Chad Glazier
            </span> 
            <br />
            and I am a 
            <br />
            <span className={styles.title + " " + styles.emphasis}>
              Full-Stack Web Developer
            </span>
          </h1>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={() => navigateTo("skills")}>My Skills &amp; Qualifications</button>
            <button className={styles.button} onClick={() => navigateTo("portfolio")}>My Projects</button>
            <button className={styles.button} onClick={() => navigateTo("contact")}>Get In Touch</button>
          </div>
          <div className={styles.links}>
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
                src="/github-light.svg"
                alt="Click here to visit my Github!"
                width={30}
                height={30}
              />          
            </Link>
          </div>
        </div>
        <Image
          className={styles.image}
          height={1380}
          width={1500}
          src="/wizard.png"
          alt="Me!"
        />
      </section>
    </article>
  )
}
