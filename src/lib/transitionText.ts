
/**
 * Transitions text from one string to another.
 *
 * @param initial the initial text.
 * @param target the desired end text.
 * @param setFn the function that updates the displayed text. 
 * @param duration the duration of the transition in milliseconds.
 */
function transitionText(
	initial: string, 
	target: string, 
	setFn: (current: string) => void, 
	duration = 300
) {
	let currentArr = initial.split("")
	const targetArr = target.split("")
	const steps = Math.max(target.length, initial.length)

	let i = 0

	const interval = setInterval(() => {
		if (i > targetArr.length) {
			currentArr[i] = ""
		} else if (i > currentArr.length) {
			currentArr.push(targetArr[i])
		} else {
			currentArr[i] = targetArr[i]
		}

		setFn(currentArr.join(""))
		i++
		if (i > steps) {
			clearInterval(interval)
		}
	}, duration / steps)

	return interval
}

export default transitionText
