import { useEffect, useState } from "react"
import "./App.css"

import Main from "./components/Main"
import ToggleButton from "./components/misc/ToggleButton"
import transitionText from "./lib/transitionText"
import SolarSystem from "./components/SolarSystem"

function App() {

    const [hideMain, setHideMain] = useState(false)
    const [toggleButtonText, setToggleButtonText] = useState("Exit")

    useEffect(() => {
        if (hideMain) {
            transitionText(toggleButtonText, "Return", setToggleButtonText)
        } else {
            transitionText(toggleButtonText, "Close", setToggleButtonText)
        }
    }, [hideMain])

    return (
        <>
            <SolarSystem
                hidden={!hideMain}
            />
            <Main
                hidden={hideMain}
            />
            <ToggleButton
                text={toggleButtonText}
                onClick={() => {
                    setHideMain(prev => !prev)
                }}
            />
        </>
    )
}

export default App
