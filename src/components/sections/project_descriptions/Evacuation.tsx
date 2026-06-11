import Link from "../../misc/Link"
import ProjectDescription from "./ProjectDescription"

function Evacuation() {
	return <ProjectDescription>
		<h1>Evacuation</h1>
		<p>
			Evacuation is a simple browser-based game built with native JavaScript and the WebGL browser interface. This project involves OpenGL shader code, procedures for generating vertex geometry, and linear algebra for transformations in affine space. It also came with less immediate problems I had to solve, including managing complex game states, mapping browser-based user input to game actions, and detecting collisions. 
		</p>
		<p>
			Handling the math for Evacuation motivated me to create a small library of functions for matrix algebra carefully made for ideal performance&mdash;by JavaScript standards, that is. You can find that package <Link href="https://jsr.io/@min-webgl/matrices" text="here" />.
		</p>
	</ProjectDescription>
}

export default Evacuation
