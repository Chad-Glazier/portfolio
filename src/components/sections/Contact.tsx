import styles from "./Contact.module.css"
import headshot from "../../assets/headshot.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import Link from "../misc/Link"

type ContactProps = {

}

function Contact({}: ContactProps) {


    return <section className={styles.container}>
        <img
            src={"https://placehold.co/200x200"}
            alt="A portrait of me."
            className={styles.portrait}
        />

        <div className={styles.contactInfo}>
            <p>
                If you want to hire me so I can afford more Magic: the Gathering cards, feel free to reach out.
            </p>
            <p>
                <FontAwesomeIcon icon={faLocationDot} /> Kelowna, BC, Canada
            </p>
            <p>
                <FontAwesomeIcon icon={faEnvelope} /> <Link href="mailto:chadglazier@outlook.com" text="chadglazier@outlook.com" />
            </p>
        </div>
    </section>
}

export default Contact
