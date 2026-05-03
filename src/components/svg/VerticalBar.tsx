
export type VerticalBarProps = {
	height: number
} & ({
	arrowYPx: number
	arrowYPercent?: undefined
} | {
	arrowYPx?: undefined
	arrowYPercent: number
})

function VerticalBar({ 
	height, arrowYPercent, arrowYPx
}: VerticalBarProps) {

	const arrowWidth = 16
	const arrowHeight = 32

	let arrowY: number
	if (arrowYPx !== undefined) {
		arrowY = arrowYPx
	} else {
		arrowY = height * (arrowYPercent! / 100)
	}

	arrowYPx = Math.max(arrowHeight/2 + 16, arrowHeight)
	arrowYPx = Math.min(height - arrowHeight/2 - 16, arrowHeight)

	return <svg
		xmlns="http://www.w3.org/2000/svg"
		width={22}
		height={height}
		fill="none"
	>
		<path
			stroke="url(#a)"
			strokeWidth={2}
			d={`
				M 1 0
				V ${arrowY - arrowHeight/2}
				L ${arrowWidth} ${arrowY}
				L1 ${arrowY + arrowHeight/2}
				V ${height}
			`}
		/>
		<defs>
			<linearGradient
				id="a"
				x1={10.75}
				x2={10.75}
				y1={0}
				y2={height}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#888" stopOpacity={0} />
				<stop offset={0.04} stopColor="#888" stopOpacity={1} />
				<stop offset={0.954} stopColor="#888" stopOpacity={1} />
				<stop offset={1} stopColor="#888" stopOpacity={0} />
			</linearGradient>
		</defs>
	</svg>
}

export default VerticalBar
