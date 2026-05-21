import styles from "./SolarSystem.module.css"
import getSystem from "../webgl"
import { useEffect, useState } from "react"
import type { SolarObject } from "../webgl/constants/solarSystem"
import transitionText from "../lib/transitionText"
import { disableCameraControls, enableCameraControls } from "../lib/enableCameraControls"

type SolarSystemProps = {
	hidden?: boolean
}

function SolarSystem({
	hidden
}: SolarSystemProps) {

	const [ planet, setPlanet ] = useState<SolarObject>("terra")
	const [ planetName, setPlanetName ] = useState<string>("Luna")

	useEffect(() => {
		const system = getSystem()
		if (system == null) {
			return
		}

		system.setFocus(planet)
		
		const newPlanetName = planet == "terra" ? "world" : planet

		transitionText(planetName, newPlanetName, setPlanetName)

	}, [planet])

    // When the solar system is hidden, we disable the controls; when its un-
    // hidden, we enable them.
    useEffect(() => {
        if (hidden) {
            disableCameraControls()
        } else {
            enableCameraControls()
        }
    }, [hidden])

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



export default SolarSystem
