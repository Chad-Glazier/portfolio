export {
  animateText,
  animateTextSwap
}

/**
 * Animates two strings from one to the other. Unlike the `animateText` function,
 * this one will generate frames for both strings.
 * 
 * @param stringA string to animate from
 * @param stringB other string to animate from
 * @param options specify the options to apply
 * 
 * 
 */
function animateTextSwap(
  stringA: string,
  stringB: string,
  options?: Partial<{
    /** 
     * the duration of the animation in milliseconds 
     * 
     * @default 400
    */
    duration: number;
    /** 
     * An easing function that takes in the progress, which ranges from 0 to 1, 
     * and should return a value that is also in the range of 0 to 1.
     * 
     * @default x => x // linear
     */
    easing: (progress: number) => number;
    /**
     * A function that is invoked every time a new frame is generated (the frequency
     * can be specified by `framesPerSecond`).
     * 
     * @param stringAFrame the next frame for the first string argument.
     * @param stringBFrame the next frame for the second string argument.
     */
    onFrame: (stringAFrame: string, stringBFrame: string) => void;
    /**
     * A function that is invoked only once, when the animation is complete.
     */
    onComplete: () => void;
    framesPerSecond: number;
  }>
) {
  const duration = options?.duration || 400;
  const easing = options?.easing || (x => x);
  const onFrame = options?.onFrame || (() => {});
  const onComplete = options?.onComplete || (() => {});
  const framesPerSecond = options?.framesPerSecond || 30;

  const frameDuration = 1000 / framesPerSecond;
  const progressPerFrame = 1 / (duration / 1000 * framesPerSecond);
  let progress = progressPerFrame;

  const interval = setInterval(() => {
    if (progress >= 1) {
      clearInterval(interval);
      onFrame(stringB, stringA);
      onComplete();
      return;
    }
    const frameA = getFrame(stringA, stringB, easing(progress));
    const frameB = getFrame(stringB, stringA, easing(progress));
    onFrame(frameA, frameB);
    progress += progressPerFrame;
  }, frameDuration);
}

/**
 * Animates text from one string to another.
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
    prefix: string;
  }>
) {
  const duration = options?.duration || 400;
  const easing = options?.easing || (x => x);
  const onFrame = options?.onFrame || (() => {});
  const onComplete = options?.onComplete || (() => {});
  const framesPerSecond = options?.framesPerSecond || 60;
  const prefix = options?.prefix || "";

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
    onFrame(prefix + frame);
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
