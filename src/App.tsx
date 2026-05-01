import { useEffect, useState } from "react"
import "./App.css"

import Landing from "./components/Landing"
import getSystem from "./webgl"
import { enableCameraControls, disableCameraControls } from "./lib/enableCameraControls"

function App() {

	const [hideLanding, setHideLanding] = useState(false)

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
		}
	}, [hideLanding])

	return (
		<>
			<Landing 
				hidden={hideLanding} 
				onExit={() => setHideLanding(true)} 
			/>
		</>
	)
}

export default App
