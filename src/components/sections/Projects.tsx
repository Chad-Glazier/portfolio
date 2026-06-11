import styles from "./Projects.module.css"
import Carousel from "../misc/Carousel"
import evacuationGif from "../../assets/clips/evacuation_clip.gif"
import Evacuation from "./project_descriptions/Evacuation"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import EDI from "./project_descriptions/EDI"

function Projects() {

    return <section className={styles.container}>
        <Carousel
            items={[
                {
                    heading: "Evacuation",
                    image: {
                        src: evacuationGif,
                        alt: ""
                    },
                    links: [
                        {
                            href: "https://chad-glazier.github.io/evacuation/",
                            icon: faGlobe,
				            text: "Visit"
                        }, {
                            href: "https://github.com/Chad-Glazier/evacuation/",
                            icon: faGithub,
				            text: "Repository"
                        }
                    ],
                    description: <Evacuation />
                }, {
                    heading: "EDI",
                    image: {
                        src: "",
                        alt: ""
                    },
                    links: [],
                    description: <EDI />
                }, {
                    heading: "OMR Service",
                    image: {
                        src: "",
                        alt: ""
                    },
                    links: [],
                    description: <p>ello ol chap</p>
                }, {
                    heading: "Control Ward",
                    image: {
                        src: "",
                        alt: ""
                    },
                    links: [],
                    description: <p>ello ol chap</p>
                },
            ]}
        />
    </section>
}

export default Projects
