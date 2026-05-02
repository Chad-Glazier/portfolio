import { useEffect, useState } from "react"
import "./App.css"

import Landing from "./components/Landing"
import getSystem from "./webgl"
import { enableCameraControls, disableCameraControls } from "./lib/enableCameraControls"
import Carousel from "./components/Carousel"

function App() {

	const [hideLanding, setHideLanding] = useState(false)
	const [showCarousel, setShowCarousel] = useState(false)

	// Every 200ms, we check if the system is loaded. If it is, then we set up
	// the controls and stop checking.
	useEffect(() => {
		const retry = setInterval(() => {
			const system = getSystem()
			if (system) {
				enableCameraControls(system)
				clearInterval(retry)
			}
		}, 200)
	}, [])

	// When the landing page is hidden, we disable the controls.
	useEffect(() => {
		if (hideLanding) {
			disableCameraControls()
			setTimeout(() => {
				setShowCarousel(true)
			}, 400)
		}
	}, [hideLanding])

	return (
		<>
			<Landing 
				hidden={hideLanding} 
				onExit={() => setHideLanding(true)} 
			/>
			<Carousel
				hidden={!showCarousel}
				onExit={() => {
					setShowCarousel(false)
					setHideLanding(false)
					enableCameraControls(getSystem()!)
				}}
			/>
		</>
	)
}

export default App
