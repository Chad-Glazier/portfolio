import styles from "./Carousel.module.css"
import { VerticalSelector } from "./skyrim_ui"
import { useState } from "react"

type CarouselProps = {
    hidden: boolean
}

function Carousel({
    hidden
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
    </section>
}

export default Carousel
