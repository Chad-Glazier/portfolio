import styles from "./Main.module.css"
import Introduction from "./sections/Introduction"
import { VerticalSelector } from "./skyrim_ui"
import { useEffect, useState } from "react"

type MainProps = {
    hidden: boolean
}

function Main({
    hidden
}: MainProps) {

    const navItems = ["Introduction", "Background", "Projects", "Contact"]
    const [selectedNavItem, setSelectedNavItem] = useState("Introduction")

    const [isBehind, setIsBehind] = useState(!hidden)
    useEffect(() => {
        setTimeout(() => {
            setIsBehind(hidden)
        }, 800)
    }, [hidden])

    return <main
        className={styles.container + 
            (hidden ? " " + styles.hidden : "")
        }
        style={{ zIndex: isBehind ? -1 : undefined }}
    >
        <VerticalSelector
            className={styles.nav}
            items={navItems}
            onSelect={setSelectedNavItem}		
            selected={selectedNavItem}
        />
        <article
            className={styles.article}
        >
            <Introduction />
        </article>
    </main>
}

export default Main
