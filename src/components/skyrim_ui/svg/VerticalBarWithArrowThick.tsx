import { useEffect, useState } from "react"
import type { VerticalBarWithArrowProps } from "./VerticalBarWithArrow"

const STROKE_WIDTH = 1.4
const COLOR = "#ababab"

function VerticalBarWithArrowThick({
    height, arrowYPercent, arrowYPx
}: VerticalBarWithArrowProps) {

    let arrowY: number
    if (arrowYPx !== undefined) {
        arrowY = arrowYPx
    } else {
        arrowY = height * (arrowYPercent! / 100)
    }

    // The arrowY value is computed under the assumption that it's perfectly
    // symmetrical, but it isn't. This adjustment corrects for that.
    arrowY += 3

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
        width="19"
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="10%" stopColor="white" stopOpacity="1" />
                <stop offset="90%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <mask id="fadeMask">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#fadeGradient)" />
            </mask>
        </defs>

        <g mask="url(#fadeMask)">
            <TopChain startY={0} endY={animatedY - 35} />
            <Arrow startY={animatedY - 35} />
            <BottomChain startY={animatedY + 46} endY={height} />
        </g>
    </svg>
}

function Arrow({ startY }: { startY: number }) {
    return <>
        <path
            d={`
				M 4.75 ${startY + 15}
				V ${startY + 6}
				L 0.75 ${startY + 1}
				V ${startY - 5}
			`}
            stroke={COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d={`
				M 1.25 ${startY + 6.5}
				V ${startY + 16.5}
				L 18.25 ${startY + 33.5}
				L 1.25 ${startY + 50.5}
				V ${startY + 59.5}
				L 5.25 ${startY + 64.5}
				V ${startY + 70.5}
			`}
            stroke={COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d={`
				M 4.25 ${startY + 23.5}
				V ${startY + 24.25}
				L 13.25 ${startY + 33.25}
				L 4.25 ${startY + 41.5}
				V ${startY + 42.5}
			`}
            stroke={COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d={`
				M 5.25 ${startY + 58.5}
				V ${startY + 50.5}
			`}
            stroke={COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </>
}

function TopChain({
    startY,
    endY
}: {
    startY: number
    endY: number
}) {
    const links = []
    for (let y = endY; y > startY; y -= 12) {
        links.push(<path
            key={y}
            d={`
				M 4.75 ${y}
				V ${y - 6}
				L 0.75 ${y - 11} 
				V ${y - 17}
			`}
            stroke={COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
        />)
    }

    return <>
        {links}
    </>
}

function BottomChain({
    startY,
    endY
}: {
    startY: number
    endY: number
}) {
    const links = []
    for (let y = startY; y < endY; y += 12) {
        links.push(<path
            key={y}
            d={`
				M 4.75 ${y}
				V ${y - 6}
				L 0.75 ${y - 11} 
				V ${y - 17}
			`}
            stroke={COLOR}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
        />)
    }

    return <>
        {links}
    </>
}

export default VerticalBarWithArrowThick
