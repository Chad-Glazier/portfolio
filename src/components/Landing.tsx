import styles from "./Landing.module.css"
import getSystem from "../webgl"
import { useEffect, useState } from "react"
import type { SolarObject } from "../webgl/constants/solarSystem"
import transitionText from "../lib/transitionText"

type LandingProps = {
	hidden?: boolean
}

function Landing({
	hidden
}: LandingProps) {

	const [ planet, setPlanet ] = useState<SolarObject>("terra")
	const [ planetName, setPlanetName ] = useState<string>("World")

	useEffect(() => {
		const system = getSystem()
		if (system == null) {
			return
		}

		system.setFocus(planet)
		
		const newPlanetName = planet == "terra" ? "world" : planet

		transitionText(planetName, newPlanetName, setPlanetName)

	}, [planet])

	return <section 
		className={styles.container + (hidden ? " " + styles.hidden : "")}
	>
		<h1 className={styles.heading}>
			Hello,<br />
			<span
				className={styles.planetSwitch}
				onClick={() => {
					const system = getSystem()
					if (system === null) {
						return
					}
					setPlanet(system.nextPlanet())
				}}
			>
				{planetName}
			</span>.
		</h1>
	</section>
}



export default Landing
