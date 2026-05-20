import styles from "./VerticalSelector.module.css"
import { useLayoutEffect, useRef, useState } from "react"
import VerticalBarWithArrow from "./svg/VerticalBarWithArrow"
import VerticalBarWithArrowThick from "./svg/VerticalBarWithArrowThick"

type VerticalSelectorProps<T extends string> = {
    // The items that the user can select from.
    items: T[]
    // When the user selects an item, this callback will be invoked.
    onSelect: (item: T) => void
    // Determines the style of the vertical bar displayed next to the items.
    style?: "normal" | "thick"
    // This class will be passed down the the underlying component, allowing
    // you to set the styles for it.
    className?: string
    // The currently-selected item.
    selected: T
}

/**
 * Returns a vertical list of selectable items. 
 * 
 * Example:
 * ```ts
 * // Inside a React component...
 * const navItems = ["Introduction", "Background", "Projects", "Contact"]
 * const [selectedNavItem, setSelectedNavItem] = useState("Introduction")
 * ...
 * <VerticalSelector
 *     className={styles.nav} // Some custom class name to apply styles
 *     items={navItems}
 *     onSelect={setSelectedNavItem}		
 *     selected={selectedNavItem}
 * />
 * ```
 */
function VerticalSelector<T extends string>({
    items, onSelect, style, className, selected
}: VerticalSelectorProps<T>) {

    // Set defaults.
    style ??= "normal"
    className ??= ""

    const container = useRef<null | HTMLElement>(null)
    const [barHeight, setBarHeight] = useState(0)
    const [arrowTop, setArrowTop] = useState(0)

    useLayoutEffect(() => {
        if (!container.current) return

        setBarHeight(container.current.clientHeight)

        // Get the vertical distance, in pixels, from the top of the container
        // to the center of the currently-selected element.
        const selectedItem = container
            .current
            .querySelector(`.${selected}`)!
        const height = selectedItem.getBoundingClientRect().top -
            container.current.getBoundingClientRect().top +
            selectedItem.clientHeight / 2
        setArrowTop(height)
    }, [selected])

    let RightBar: typeof VerticalBarWithArrow
    switch (style) {
    case "normal":
        RightBar = VerticalBarWithArrow
        break
    case "thick":
        RightBar = VerticalBarWithArrowThick
    }

    const containerClassName = styles.container + " " + className

    return <aside ref={container} className={containerClassName}>
        <nav className={styles.nav}>
            {items.map((item, idx) =>
                <div
                    key={idx}
                    onClick={() => {
                        onSelect(item)
                    }}
                    // The `item` className here is just used for the query
                    // selector. I'm aware that it's semantically wrong.
                    className={
                        item + " " 
                        + styles.navItem + " " +
                        (item == selected ?
                            styles.selected : "")
                    }
                >
                    {item}
                </div>
            )}
        </nav>
        {barHeight != 0 && <RightBar
            height={barHeight}
            arrowYPx={arrowTop}
        />}
        
    </aside>
}

export default VerticalSelector
