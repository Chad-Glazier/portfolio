import { useState } from "react"
import styles from "./Carousel.module.css"
import Nav from "./Nav"
import type { NavItem } from "./Nav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Introduction from "./panels/Introduction"
import Projects from "./panels/Projects"

type CarouselProps = {
	hidden: boolean
	onExit: () => void
}

function getPanel(panelName: NavItem) {
	switch (panelName) {
	case "Introduction":
		return <Introduction />
	case "Projects":
		return <Projects />
	default: 
		return <p>Not Found.</p>
	}
}

function Carousel({
	hidden, onExit
}: CarouselProps) {

	const [activePanel, setActivePanel] = useState<NavItem>("Introduction")

	return <section
		className={styles.container + 
			(hidden ? " " + styles.hidden : "")
		}
	>
		<Nav onSelect={setActivePanel} />
		{getPanel(activePanel)}
		<button 
			className={styles.return}
			onClick={onExit}	
		>
			<FontAwesomeIcon icon={faArrowLeft} /> Return
		</button>
	</section>
}

export default Carousel