import { useState } from "react"
import "./App.css"

import Landing from "./components/Landing"

function App() {

	const [hideLanding, setHideLanding] = useState(false)

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
