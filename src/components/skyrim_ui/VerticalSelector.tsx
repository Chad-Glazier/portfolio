import styles from "./VerticalSelector.module.css"
import { useLayoutEffect, useRef, useState } from "react"
import VerticalBarWithArrow from "./svg/VerticalBarWithArrow"
import VerticalBarWithArrowThick from "./svg/VerticalBarWithArrowThick"

type VerticalSelectorProps<T extends string> = {
    // The items that the user can select from.
    items: T[]
    // When the user selects an item, this callback will be invoked.
    onSelect: (index: number) => void
    // Determines the style of the vertical bar displayed next to the items.
    style?: "normal" | "thick" | "nobar" | "flat" 
    // This class will be passed down the the underlying component, allowing
    // you to set the styles for it.
    className?: string
    // The currently-selected index.
    selected: number
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

    let selectorNames = items.map(s => s.replaceAll(" ", "-"))

    const container = useRef<null | HTMLElement>(null)
    const [barHeight, setBarHeight] = useState(0)
    const [arrowTop, setArrowTop] = useState(0)

    const updateBar = () => {
        if (!container.current) return

        setBarHeight(container.current.clientHeight)

        // Get the vertical distance, in pixels, from the top of the container
        // to the center of the currently-selected element.
        const selectedItem = container
            .current
            .querySelector(`.${selectorNames[selected]}`)!
        const height = selectedItem.getBoundingClientRect().top -
            container.current.getBoundingClientRect().top +
            selectedItem.clientHeight / 2
        setArrowTop(height)        
    }

    useLayoutEffect(updateBar, [selected])

    const interval = useRef(setInterval(() => {
        if (barHeight == 0) {
            updateBar
        } else {
            clearInterval(interval.current)
        }
    }, 50))

    let containerClassName = styles.container + " " + className

    let RightBar: typeof VerticalBarWithArrow
    switch (style) {
    case "normal":
        RightBar = VerticalBarWithArrow
        break
    case "thick":
        RightBar = VerticalBarWithArrowThick
        break
    case "nobar":
        RightBar = VerticalBarWithArrow
        break
    case "flat":
        RightBar = VerticalBarWithArrow
        containerClassName += " " + styles.flat
        break
    }


    return <aside ref={container} className={containerClassName}>
        <nav className={styles.nav}>
            {items.map((item, idx) =>
                <div
                    key={item}
                    onClick={() => {
                        onSelect(idx)
                    }}
                    // The `item` className here is just used for the query
                    // selector. I'm aware that it's semantically wrong.
                    className={
                        selectorNames[idx] + " " 
                        + styles.navItem + " " +
                        (idx == selected ?
                            styles.selected : "")
                    }
                >
                    {item}
                </div>
            )}
        </nav>
        {barHeight != 0 && (style == "normal" || style == "thick") && <RightBar
            height={barHeight}
            arrowYPx={arrowTop}
        />}
    </aside>
}

export default VerticalSelector
