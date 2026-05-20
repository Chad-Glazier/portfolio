import styles from "./Carousel.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { VerticalSelector, LeftArrow, RightArrow } from "./skyrim_ui"
import { useState } from "react"

type CarouselProps = {
    hidden: boolean
    onExit: () => void
}

function Carousel({
    hidden, onExit
}: CarouselProps) {

    const navItems = ["Introduction", "Background", "Projects", "Contact"]
    const [selectedNavItem, setSelectedNavItem] = useState("Introduction")

    return <section
        className={styles.container + 
            (hidden ? " " + styles.hidden : "")
        }
    >
        <VerticalSelector
            className={styles.nav}
            items={navItems}
            onSelect={setSelectedNavItem}		
            selected={selectedNavItem}
        />
        <button 
            className={styles.return}
            onClick={onExit}	
        >
             <RightArrow /> Return
        </button>
    </section>
}

export default Carousel
