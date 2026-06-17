import type { JSX } from "react"
import styles from "./List.module.css"

type ListProps = {
    items: (string | JSX.Element)[]
    rowHeight?: number
    indent?: number
    className?: string
}

function List({
    items,
    rowHeight = 32,
    indent = 24,
    className = "",
}: ListProps) {
    const width = indent + 20
    const height = items.length * rowHeight

    const branches = items.map((_, idx) => {
        const y = rowHeight * idx + rowHeight / 2

        const isLast = idx === items.length - 1

        const verticalTop = idx === 0 ? 0 : y - rowHeight / 2
        const verticalBottom = isLast ? y : y + rowHeight / 2

        const path = `
            M ${indent / 2} ${verticalTop}
            L ${indent / 2} ${verticalBottom}
            M ${indent / 2} ${y}
            L ${indent} ${y}
        `

        return {
            id: idx,
            path,
        }
    })

    return (
        <div
            className={className + " " + styles.container}
        >
            <svg
                width={width}
                height={height}
                className={styles.treeSvg}
            >
                {branches.map((branch, idx) => (
                    <path
                        key={branch.id}
                        d={branch.path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                        className={styles.branch}
                        style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                    />
                ))}
            </svg>

            <ul className={styles.list}>
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className={styles.item}
                        style={{ animationDelay: `${(idx + 1) * 200}ms` }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List
