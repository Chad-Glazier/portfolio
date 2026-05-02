import { useEffect, useState } from "react"
import styles from "./Projects.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong, faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import transitionText from "../../lib/transitionText"

type ProjectName = "EDI" | "Evacuation" | "Booklend"

const projects: ProjectName[]  = [
	"EDI", "Evacuation", "Booklend"
]

function getProject(project: ProjectName | null) {
	switch (project) {
	default: 
		return <p>Not found.</p>
	}
}

function Projects() {

	const [project, setProject] = useState<ProjectName>(projects[0])
	const [title, setTitle] = useState<string>(projects[0])

	useEffect(() => {
		transitionText(title, project, setTitle)
	}, [project])

	return <main className={styles.container}>
		<section className={styles.content}>
			{getProject(project)}
		</section>
		<section className={styles.titleContainer}>
			<h1 className={styles.title}>
				{title}
			</h1>
		</section>
		<section className={styles.controls}>
			<button 
				className={styles.leftBtn}
				onClick={() => {
					const idx = projects.indexOf(project) 
					if (idx == 0) {
						setProject(projects[projects.length - 1])
					} else {
						setProject(projects[idx - 1])
					}
				}}
			>
				<FontAwesomeIcon icon={faArrowLeftLong} />
			</button>
			<button
				className={styles.rightBtn}
				onClick={() => {
					const idx = projects.indexOf(project) 
					setProject(projects[(idx + 1) % projects.length])
				}}
			>
				<FontAwesomeIcon icon={faArrowRightLong} />
			</button>
		</section>
	</main>
}

export default Projects
