
/**
 * Creates a promise that resolves after the specified number of milliseconds.
 */
async function sleep(durationMs: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, durationMs))
}

export default sleep
