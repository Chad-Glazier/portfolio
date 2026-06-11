import List from "../misc/List"
import styles from "./Introduction.module.css"

function Introduction() {

    return <section className={styles.container}>
        <h1 className={styles.heading}>
            Hello, World.
        </h1>
        <p>
            My name is Chad and I write programs. 
            I'm primarily interested in
            <List 
                items={[
                    "full-stack websites,",
                    "standalone web services, and",
                    "performance-intensive systems."
                ]}
            />
        </p>
    </section>
}

export default Introduction
