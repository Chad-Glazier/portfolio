import styles from "./Main.module.css"
import Background from "./sections/Background"
import Contact from "./sections/Contact"
import Introduction from "./sections/Introduction"
import Projects from "./sections/Projects"
import { VerticalSelector } from "./skyrim_ui"
import { useEffect, useRef, useState } from "react"

type MainProps = {
    hidden: boolean
}

function Main({
    hidden
}: MainProps) {

    type NavItem = "Introduction" | "Background" | "Projects" | "Contact"

    const navItems: NavItem[] = 
        ["Introduction", "Background", "Projects", "Contact"]
    const [selectedNavItem, setSelectedNavItem] = 
        useState<NavItem>("Introduction")
    const [isBehind, setIsBehind] = useState(!hidden)
    useEffect(() => {
        setTimeout(() => {
            setIsBehind(hidden)
        }, 800)
    }, [hidden])

    const introduction = useRef<null | HTMLDivElement>(null)
    const background = useRef<null | HTMLDivElement>(null)
    const projects = useRef<null | HTMLDivElement>(null)
    const contact = useRef<null | HTMLDivElement>(null)

    return <main
        className={styles.container + 
            (hidden ? " " + styles.hidden : "")
        }
        style={{ zIndex: isBehind ? -1 : undefined }}
    >
        <VerticalSelector<NavItem>
            className={styles.nav}
            items={navItems}
            onSelect={item => {
                switch (item) {
                case "Introduction":
                    if (introduction.current) {
                        introduction.current.scrollIntoView()
                    }
                    break
                case "Background":
                    if (background.current) {
                        background.current.scrollIntoView()
                    }
                    break
                case "Projects":
                    if (projects.current) {
                        projects.current.scrollIntoView()
                    }
                    break
                case "Contact":
                    if (contact.current) {
                        contact.current.scrollIntoView()
                    }
                    break
                }
            }}		
            selected={selectedNavItem}
        />
        <article 
            className={styles.article} 
            onScroll={() => {

                let sections = [introduction, background, projects, contact]
                    .map(ref => ref.current)
                    .filter(el => el != null)

                if (sections.length == 0) {
                    return
                } 

                let minDistance = Infinity
                let centerSection = null
                const windowCenter = window.innerHeight / 2
                for (const section of sections) {
                    const { top, bottom } = section.getBoundingClientRect()

                    if (windowCenter > top && windowCenter < bottom) {
                        centerSection = section
                        break
                    }

                    const distance = Math.min(
                        Math.abs(top - windowCenter), 
                        Math.abs(bottom - windowCenter)
                    )
                    if (distance < minDistance) {
                        minDistance = distance
                        centerSection = section
                    }
                }

                const item = centerSection!.getAttribute("id")
                if (item == null) {
                    return
                }

                setSelectedNavItem(item as NavItem)
            }}
        >
            <div 
                className={styles.section} 
                ref={introduction} 
                id="Introduction"
            >
                <Introduction />
            </div>
            <div 
                className={styles.section} 
                ref={background} 
                id="Background"
            >
               <Background />
            </div>
            <div 
                className={
                    styles.section + " " + styles.projects
                } 
                ref={projects} 
                id="Projects"
            >
               <Projects />
            </div>
            <div 
                className={styles.section} 
                ref={contact}
                id="Contact"    
            >
                <Contact />
            </div>
        </article>
    </main>
}

export default Main
