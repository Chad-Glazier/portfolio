import type { PropsWithChildren } from "react"
import styles from "./ProjectDescription.module.css"

function ProjectDescription({ children }: PropsWithChildren) {
    return <article className={styles.description}>
        {children}
    </article>
}

export default ProjectDescription
