import { useRef } from "react"
import VerticalBar from "./svg/VerticalBar"
import VerticalBarThick from "./svg/VerticalBarThick"

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

    style ??= "normal"

    const container = useRef<null | HTMLElement>(null)

    /**
     * Gets the vertical distance (in pixels) from the top of the container
     * to the middle of the currently-selected element.
     */ 
    function getSelectedItemTop(): number {
        if (!container.current) {
            return 0
        }
        const selectedItem = container
            .current
            .querySelector(`.${selected}`)!
        return selectedItem.getBoundingClientRect().top - 
            container.current.getBoundingClientRect().top + 
            selectedItem.clientHeight / 2
    }

    const Bar = style == "normal" ? VerticalBar : VerticalBarThick

    return <aside ref={container} className={className} style={{
        height: className ? undefined : "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
    }}>
        <nav style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            justifyContent: "center",
            flex: "1",
            alignItems: "center",
            paddingRight: "20px",
            paddingLeft: "20px",
            fontSize: "1.2rem",
        }}>
            {items.map((item, idx) => 
                <div
                    key={idx}
                    onClick={() => {
                        onSelect(item)
                    }}
                    // The className here is just used for the query selector.
                    // I'm aware that it's semantically wrong.
                    className={item}
                    style={{
                        cursor: "pointer",
                        userSelect: "none",
                    }}
                    
                >
                    {item}
                </div>
            )}
        </nav>
        <Bar 
            height={(container.current?.clientHeight ?? 0)}
            arrowYPx={getSelectedItemTop()}
            // mirrored
        />
    </aside>
}

export default VerticalSelector
