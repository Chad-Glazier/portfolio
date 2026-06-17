import Link from "../../misc/Link"
import ProjectDescription from "./ProjectDescription"

function Evacuation() {
	return <ProjectDescription>
		<h1>Evacuation</h1>
		<p>
			Evacuation is a simple, zero-dependency browser-based game. The project's internals include 
			basic shaders, procedures for generating simple meshes, affine transformations for vertices, 
			game state management, the mapping of browser inputs to game actions, and collision detection. 
		</p>
		<p>
			Handling the math for Evacuation also motivated me to create 
			a <Link href="https://jsr.io/@min-webgl/matrices" text="small library" /> for matrix algebra
			carefully written for ideal performance. That package is used to render the graphics you
			see in the background of this page.
		</p>
	</ProjectDescription>
}

export default Evacuation
