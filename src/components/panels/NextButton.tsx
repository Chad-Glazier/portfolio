import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./NextButton.module.css"
import type { ProjectName } from "./Projects"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import type { NavItem } from "../Nav"

type NextButtonProps = {
	text: ProjectName | NavItem
	onClick: () => void
}

function NextButton({ text, onClick }: NextButtonProps) {
	return <div className={styles.container}>
		<button 
			onClick={onClick}
			className={styles.btn}
		>
			{text}
			<FontAwesomeIcon icon={faAngleRight} className={styles.arrow} />
		</button>		
	</div>
}

export default NextButton
