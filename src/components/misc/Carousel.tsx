import { useEffect, useState, type JSX } from "react"
import styles from "./Carousel.module.css"
import ShiftingImage from "./ShiftingImage"
import { LeftArrow, RightArrow } from "../skyrim_ui"
import Beads from "./Beads"
import ShiftingElements from "./ShiftingElements"
import List from "./List"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import Link from "./Link"

type CarouselProps = {
    items: {
        heading: string
        image: {
            src: string
            alt: string
        }
        links: {
            text: string
            href: string
            icon: IconDefinition
        }[]
        description: JSX.Element
    }[]
}

// NOTE: Controls should have the dots thing to show which "slide" is active,
// since there isn't really any visual cue.

function Carousel({ items }: CarouselProps) {
    
    const [activeIdx, setActiveIdx] = useState(0)


    //
    // We keep the links separate because, in order for the List to animate as
    // expected, we need it to be "emptied" (i.e., set to `[]`) before being
    // repopulated.
    //
    const [activeLinks, setActiveLinks] = useState(items[activeIdx].links)
    useEffect(() => {
        setActiveLinks([])
        setTimeout(() => {
            setActiveLinks([...items[activeIdx].links])
        }, 100)
    }, [activeIdx])

    return <div
        className={styles.container}
    >
        <div className={styles.image}>
            <ShiftingImage 
                items={items.map(({ image }) => image)}
                activeIdx={activeIdx}
                duration={400}
            />            
        </div>
        <div className={styles.body}>
            <ShiftingElements 
                items={items.map(item => item.description)}
                activeIndex={activeIdx}
            />
        </div>
        <div className={styles.links}>
            <List items={activeLinks.map(link =>
                <Link 
                    text={link.text}
                    href={link.href}
                    icon={link.icon}
                />
            )} />
        </div>
        <nav 
            className={styles.controls}
        >
            <button 
                className={styles.leftButton}
                onClick={() => {
                    setActiveIdx(prev => {
                        if (prev == 0) {
                            return items.length - 1
                        }
                        return prev - 1
                    })
                }}
            >
                <LeftArrow />
            </button>
            <Beads
                length={items.length}
                activeIdx={activeIdx}
                onSelect={setActiveIdx}
            />
            <button
                className={styles.rightButton}
                onClick={() => {
                    setActiveIdx(prev => {
                        return (prev + 1) % items.length
                    })
                }}
            >
                <RightArrow />
            </button>
        </nav>
    </div>
}

export default Carousel
