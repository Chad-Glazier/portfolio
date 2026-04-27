import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Landing.module.css"
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons"
import getSystem from "../webgl"
import { useEffect, useState } from "react"
import type { SolarObject } from "../webgl/constants/solarSystem"
import transitionText from "../lib/transitionText"

function Landing() {

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

	return <section className={styles.container}>
		<h1 className={styles.heading}>
			Hello,&nbsp; 
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
		<button className={styles.downButton} onClick={() => {
			// TODO
		}}>
			<FontAwesomeIcon icon={faAnglesDown} />
		</button>
	</section>
}



export default Landing
