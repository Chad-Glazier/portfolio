import styles from "./Evacuation.module.css"
import evacuationClip from "../../../assets/clips/evacuation_clip.gif"
import Link from "../../misc/Link"
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

function Evacuation() {
	return <article className={styles.container}>
		<h1 className={styles.heading}>Evacuation</h1>
		<div
			className={styles.clipContainer}
		>
			<img
				loading="eager"
				src={evacuationClip}
				alt="A short clip of gameplay from Evacuation"
				className={styles.clip}
			/>
		</div>
		<div className={styles.links}>
			<Link 
				href="https://chad-glazier.github.io/evacuation/"
				text="Website"
				icon={faGlobe}
			/>
			<Link 
				href="https://github.com/Chad-Glazier/evacuation"
				text="Code"
				icon={faGithub}
			/>
		</div>
		<div className={styles.text}>
			<p>
				Evacuation is a simple browser-based game built native JavaScript and the WebGL browser interface. This project required me to write OpenGL shader code, come up with procedures for generating vertices, and use linear algebra to handle transformations in affine space. It also came with less immediate problems I had to figure out, including managing complex game states, mapping browser-based user input into game actions, and detecting collisions. 
			</p>
			<p>
				Handling the math for Evacuation motivated me to create a small library of functions for matrix algebra carefully made for ideal performance&mdash;by JavaScript standards, that is. You can find that package <Link href="https://jsr.io/@min-webgl/matrices" text="here" />.
			</p>
		</div>
	</article>
}

export default Evacuation
