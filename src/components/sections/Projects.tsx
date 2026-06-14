import styles from "./Projects.module.css"
import Carousel from "../misc/Carousel"
import evacuationGif from "../../assets/clips/evacuation_clip.gif"
import ediGif from "../../assets/clips/edi_cli_clip.gif"
import Evacuation from "./project_descriptions/Evacuation"
import EDI from "./project_descriptions/EDI"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faGolang } from "@fortawesome/free-brands-svg-icons"

function Projects() {

    return <section className={styles.container}>
        <Carousel
            items={[
                {
                    heading: "Evacuation",
                    image: {
                        src: evacuationGif,
                        alt: "a short clip of Evacuation gameplay"
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
                        src: ediGif,
                        alt: "a short clip of the EDI command-line tool"
                    },
                    links: [
                        {
                            href: "https://ediproject.org/",
                            icon: faGlobe,
				            text: "Website"
                        }, {
                            href: "https://pkg.go.dev/github.com/Chad-Glazier/edi",
                            icon: faGolang,
				            text: "EDI Library"
                        }, {
                            href: "https://github.com/Chad-Glazier/edi_cli",
                            icon: faGithub,
                            text: "Command-line tool"
                        }
                    ],
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
