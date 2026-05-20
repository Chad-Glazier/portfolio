import styles from "./Carousel.module.css"
import { VerticalSelector, RightArrow } from "./skyrim_ui"
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

    const [showReturnArrow, setShowReturnArrow] = useState(false)

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
            onMouseEnter={() => setShowReturnArrow(true)}
            onMouseLeave={() => setShowReturnArrow(false)}
        >
             <RightArrow hidden={!showReturnArrow} /> Return
        </button>
    </section>
}

export default Carousel
