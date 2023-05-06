export default animateText;

/**
 * Animates text from one string to another.
 * 
 * @example
 * ```tsx
 * const [text, setText] = useState("Hello World!");
 * 
 * return (
 *   <>
 *     <h1>{text}</h1>
 *     <button 
 *       onClick={() => animateText(text, "Goodbye World!", { onFrame: setText })}
 *     >
 *      Say Goodbye!
 *     </button>
 *   </>
 * );
 * ``` 
 *
 * 
 * @param initial the initial state of the text
 * @param final the final state of the text
 * @param options options to specify `duration`, `easing`, `onFrame`, `onComplete`, and `framesPerSecond`.
 */
function animateText(
  initial: string,
  final: string,
  options?: Partial<{
    duration: number;
    easing: (progress: number) => number;
    onFrame: (frame: string) => void;
    onComplete: () => void;
    framesPerSecond: number;
  }>
) {
  const duration = options?.duration || 400;
  const easing = options?.easing || (x => x);
  const onFrame = options?.onFrame || (() => {});
  const onComplete = options?.onComplete || (() => {});
  const framesPerSecond = options?.framesPerSecond || 60;

  const frameDuration = 1000 / framesPerSecond;
  const progressPerFrame = 1 / (duration / 1000 * framesPerSecond);
  let progress = progressPerFrame;

  const interval = setInterval(() => {
    if (progress >= 1) {
      clearInterval(interval);
      onFrame(final);
      onComplete();
      return;
    }
    const frame = getFrame(initial, final, easing(progress));
    onFrame(frame);
    progress += progressPerFrame;
  }, frameDuration);
}

function getFrame(initial: string, final: string, progress: number) {
  const currentLength = Math.floor(initial.length + (final.length - initial.length) * progress);
  const resolvedLength = Math.floor(final.length * progress);
  const resolvedPortion = final.substring(0, resolvedLength);
  const randomPortion = randomizeString(initial.substring(resolvedLength, currentLength + 1));
  return resolvedPortion + randomPortion;
}

function randomizeString(str: string) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
          result += str[i];
          continue;
      }
      if (str[i] === str[i].toUpperCase()) {
          result += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
          continue;
      }
      result += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
  }
  return result;
}
