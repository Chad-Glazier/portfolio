import styles from "./Intro.module.css"

function Intro() {
	return <section className={styles.container}>
		<h1 className={styles.heading}>
			My name is <span className={styles.vivid}>Chad</span> and I make <span className={styles.vivid}>software</span>.
		</h1>
	</section>
}

export default Intro
