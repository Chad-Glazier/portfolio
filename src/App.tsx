import { useEffect, useRef, useState } from "react"
import "./App.css"

import Landing from "./components/Landing"
import getSystem from "./webgl"
import enableDragControls from "./lib/enableDragControls"

function App() {

	const [hideLanding, setHideLanding] = useState(false)
	const disableControls = useRef<null | (() => void)>(null)

	useEffect(() => {
		const retry = setInterval(() => {
			const system = getSystem()
			if (system) {
				disableControls.current = enableDragControls(system)
				clearInterval(retry)
			}
		}, 200)
	}, [])

	useEffect(() => {
		if (hideLanding && disableControls.current) {
			disableControls.current()
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
