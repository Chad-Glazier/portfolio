import { useEffect, useState } from "react"
import styles from "./Projects.module.css"
import transitionText from "../../lib/transitionText"
import Evacuation from "./projects/Evacuation"
import NextButton from "./NextButton"
import { navItems, type NavItem } from "../Nav"

export type ProjectName = "EDI" | "Evacuation" | "Booklend"

export const projects: ProjectName[]  = [
	"Evacuation", "EDI", "Booklend"
]

function getProject(project: ProjectName | null) {
	switch (project) {
	case "Evacuation":
		return <Evacuation />
	default: 
		return <p>Not found.</p>
	}
}

type ProjectsProps = {
	onNext: (nextPanel: NavItem) => void
}

function Projects({ onNext }: ProjectsProps) {

	const [project, setProject] = useState<ProjectName>(projects[0])

	const nextProject = () => {
		const currentIdx = projects.indexOf(project)
		if (projects.length === currentIdx + 1) {
			return null
		}
		return projects[currentIdx + 1]
	}

	const nextPanel = () => {
		return navItems[navItems.indexOf("Projects") + 1]
	}

	return <main className={styles.container}>
		<section className={styles.content}>
			<h1 className={styles.title}>
				{project}
			</h1>
			{getProject(project)}
			<NextButton 
				text={nextProject() == null ? nextPanel() : nextProject()!}
				onClick={() => {
					if (nextProject()) {
						setProject(nextProject()!)
					} else {
						onNext(nextPanel())
					}
				}}
			/>
		</section>
	</main>
}

export default Projects
