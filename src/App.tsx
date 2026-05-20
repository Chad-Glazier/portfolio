import { useEffect, useState } from "react"
import "./App.css"

import Landing from "./components/Landing"
import { enableCameraControls, disableCameraControls } from "./lib/enableCameraControls"
import Carousel from "./components/Carousel"
import ToggleButton from "./components/ToggleButton"
import transitionText from "./lib/transitionText"

function App() {

	const [hideCarousel, setHideCarousel] = useState(false)
    const [toggleButtonText, setToggleButtonText] = useState("Exit")

	// When the landing page is hidden, we disable the controls.
	useEffect(() => {
        if (hideCarousel) {
            transitionText(toggleButtonText, "Return", setToggleButtonText)
            enableCameraControls()
        } else {
            transitionText(toggleButtonText, "Exit", setToggleButtonText)
            disableCameraControls()
        }
    }, [hideCarousel])

	return (
		<>
			<Landing 
				hidden={!hideCarousel} 
			/>
			<Carousel
				hidden={hideCarousel}
			/>
            <ToggleButton
                text={toggleButtonText}
                onClick={() => {
                    setHideCarousel(prev => !prev)
                }}
            />
		</>
	)
}

export default App
