import { useEffect, useState } from "react"
import transitionText from "../../lib/transitionText"

type ShiftingTextProps = {
    items: string[]
    activeIdx: number
    duration?: number
}

function ShiftingText({ items, activeIdx, duration }: ShiftingTextProps) {

    duration ??= 400

    const [activeText, setActiveText] = useState<string>(items[activeIdx])
    useEffect(() => {
        transitionText(activeText, items[activeIdx], setActiveText, duration)
    }, [activeIdx])

    return <span>
        {activeText}
    </span>
}

export default ShiftingText
