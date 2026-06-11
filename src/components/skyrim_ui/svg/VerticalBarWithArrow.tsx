import { useEffect, useState } from "react"

export type VerticalBarWithArrowProps = {
	height: number
	mirrored?: boolean
} & ({
	arrowYPx: number
	arrowYPercent?: undefined
} | {
	arrowYPx?: undefined
	arrowYPercent: number
})

function VerticalBarWithArrow({ 
	height, arrowYPercent, arrowYPx, mirrored
}: VerticalBarWithArrowProps) {

	const arrowWidth = 16
	const arrowHeight = 32

	let arrowY: number
	if (arrowYPx !== undefined) {
		arrowY = arrowYPx
	} else {
		arrowY = height * (arrowYPercent! / 100)
	}

	// The arrowY value is computed under the assumption that it's perfectly
	// symmetrical, but it isn't. This adjustment corrects for that.
	arrowY += 1

	// Animates the value of the height.
	const ANIMATION_DURATION_MS = 400

	const [animatedY, setAnimatedY] = useState(arrowY)

	useEffect(() => {
		const startY = animatedY
		const delta = arrowY - startY

		let frame: number
		let then: number | null = null

		function animate(now: number) {
			if (then === null) {
				then = now
			}

			const elapsed = now - then

			// Normalized progress in [0, 1]
			const t = Math.min(elapsed / ANIMATION_DURATION_MS, 1)

			// Optional easing
			const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic

			setAnimatedY(startY + delta * eased)

			if (t < 1) {
				frame = requestAnimationFrame(animate)
			}
		}

		frame = requestAnimationFrame(animate)

		return () => cancelAnimationFrame(frame)
	}, [arrowY])

	return <svg
		xmlns="http://www.w3.org/2000/svg"
		width={22}
		height={height}
		fill="none"
	>
		<path
			stroke="url(#a)"
			strokeWidth={2}
			d={mirrored ?
			`
				M ${arrowWidth} 0
				V ${animatedY - arrowHeight/2}
				L ${0} ${animatedY}
				L ${arrowWidth} ${animatedY + arrowHeight/2}
				V  ${height}
			`
			:
			`
				M 1 0
				V ${animatedY - arrowHeight/2}
				L ${arrowWidth} ${animatedY}
				L1 ${animatedY + arrowHeight/2}
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
				<stop stopColor="#484848" stopOpacity={0} />
				<stop offset={0.04} stopColor="#484848" stopOpacity={1} />
				<stop offset={0.954} stopColor="#484848" stopOpacity={1} />
				<stop offset={1} stopColor="#484848" stopOpacity={0} />
			</linearGradient>
		</defs>
	</svg>
}

export default VerticalBarWithArrow
