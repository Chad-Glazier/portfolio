import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Intro.module.css"
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons"

function Intro() {
	return <section className={styles.container}>
		<h1 className={styles.heading}>
			Hello, World.
		</h1>
		<button className={styles.downButton}>
			<FontAwesomeIcon icon={faAnglesDown} />
		</button>
	</section>
}

export default Intro
