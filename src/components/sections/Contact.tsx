import styles from "./Contact.module.css"
import headshot from "../../assets/headshot.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import ClipboardLink from "../misc/ClipboardLink"
import List from "../misc/List"
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
            <List items={[
                <><FontAwesomeIcon icon={faLocationDot} /> Kelowna, BC</>,
                <ClipboardLink 
                    icon={faEnvelope}
                    string="chadglazier@outlook.com" 
                    text="Send me an Email" 
                />,
                <Link 
                    icon={faGithub}
                    href={"https://github.com/Chad-Glazier"}
                    text="Peep my Github"
                />,
                <Link 
                    icon={faLinkedin}
                    href="https://www.linkedin.com/in/chad-glazier-4b585a257/"
                    text="I have a LinkedIn too"
                />
            ]} />
            <p>
                
            </p>
            <p>
                
            </p>
        </div>
    </section>
}

export default Contact
