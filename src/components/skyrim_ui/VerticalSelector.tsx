import { useState } from "react"
import styles from "./VerticalSelector.module.css"
import VerticalBar from "./svg/VerticalBar"
import VerticalBarThick from "./svg/VerticalBarThick"

type VerticalSelectorProps<T extends string> = {
	items: T[]
	onSelect: (item: T) => void
	style: "normal" | "thick"
}

function VerticalSelector<T extends string>({
	items, onSelect, style
}: VerticalSelectorProps<T>) {

	const [progress, setProgress] = useState(0)

	const Bar = style == "normal" ? VerticalBar : VerticalBarThick

	return <aside className={styles.container}>
		<nav>
			{items.map(item => 
				<div
					className={styles.item}
				>
					{item}
				</div>
			)}
		</nav>
		<Bar 
			height={100}
			arrowYPercent={10}
		/>
	</aside>
}

export default VerticalSelector
