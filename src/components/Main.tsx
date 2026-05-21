import styles from "./Main.module.css"
import { VerticalSelector } from "./skyrim_ui"
import { useState } from "react"

type MainProps = {
    hidden: boolean
}

function Main({
    hidden
}: MainProps) {

    const navItems = ["Introduction", "Background", "Projects", "Contact"]
    const [selectedNavItem, setSelectedNavItem] = useState("Introduction")

    return <main
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
    </main>
}

export default Main
