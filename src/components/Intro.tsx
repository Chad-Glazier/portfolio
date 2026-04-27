import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Intro.module.css"
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons"
import getSystem from "../webgl"
import { useEffect, useState } from "react"
import type { SolarObject } from "../webgl/constants/solarSystem"

function Intro() {

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

function transitionText(
	initial: string, 
	target: string, 
	setFn: (current: string) => void, 
	duration = 300
) {
	let currentArr = initial.split("")
	const targetArr = target.split("")
	const steps = Math.max(target.length, initial.length)

	let i = 0

	const interval = setInterval(() => {
		if (i > targetArr.length) {
			currentArr[i] = ""
		} else if (i > currentArr.length) {
			currentArr.push(targetArr[i])
		} else {
			currentArr[i] = targetArr[i]
		}

		setFn(currentArr.join(""))
		i++
		if (i > steps) {
			clearInterval(interval)
		}
	}, duration / steps)

	return interval
}

export default Intro
