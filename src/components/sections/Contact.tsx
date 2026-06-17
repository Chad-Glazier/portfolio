import styles from "./Contact.module.css"
import headshot from "../../assets/headshot.jpg"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import ClipboardLink from "../misc/ClipboardLink"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import Link from "../misc/Link"

type ContactProps = {

}

function Contact({}: ContactProps) {


    return <section className={styles.container}>
        <img
            src={headshot}
            alt="A portrait of me."
            className={styles.portrait}
        />

        <div className={styles.contactInfo}>
            <p>
                If you want to hire me so I can afford more Magic: the Gathering cards, feel free to reach out.
            </p>
            <ul className={styles.list}>
                <li>
                    <ClipboardLink 
                        icon={faEnvelope}
                        string="chadglazier@outlook.com" 
                        text="Email" 
                    /> 
                </li>
                <li>
                    <Link 
                        icon={faGithub}
                        href={"https://github.com/Chad-Glazier"}
                        text="Github"
                    />
                </li>
                <li>
                    <Link 
                        icon={faLinkedin}
                        href="https://www.linkedin.com/in/chad-glazier-4b585a257/"
                        text="LinkedIn"
                    />                    
                </li>
            </ul>
        </div>
    </section>
}

export default Contact
