import Link from "../../misc/Link"
import ProjectDescription from "./ProjectDescription"

function Evacuation() {
	return <ProjectDescription>
		<h1>Evacuation</h1>
		<p>
			Evacuation is a simple, zero-dependency browser game written from scratch. It includes OpenGL shaders, 
			procedures for generating vertex geometry, linear algebra for transformations in affine space, game state
			management, the mapping of browser inputs to game actions, and collision detection. 
		</p>
		<p>
			Handling the math for Evacuation also motivated me to create a small library of functions for matrix 
			algebra carefully made for ideal performance&mdash;by JavaScript standards, that is. That package is used 
			to render the graphics you can see in the background of this page; you can find the documentation for 
			it <Link href="https://jsr.io/@min-webgl/matrices" text="here" />.
		</p>
	</ProjectDescription>
}

export default Evacuation
