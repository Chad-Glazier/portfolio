
/**
 * Clamps a value between two inclusive bounds.
 */
function clamp(min: number, value: number, max: number): number {
    if (value < min) {
        return min
    }
    if (value > max) {
        return max
    }
    return value
}

export default clamp
