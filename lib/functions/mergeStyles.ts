/**
 * This function is meant to take multiple style objects (via the 
 * CSS module system) and return a new style object which includes
 * the styles of both. E.g.,
 *
 * *SheetA.module.css*
 * ```css
 * .heading {
 *   text-decoration: underline;
 * }
 * ```
 * 
 * *SheetB.module.css*
 * ```css
 * .heading {
 *   color: red;
 * }
 * ```
 * 
 * *React Component*
 * ```tsx
 * import styleSheetA from "SheetA.module.css";
 * import styleSheetB from "SheetB.module.css";
 * 
 * const styles = mergeStyles(styleSheetA, styleSheetB);
 * ...
 *     <h1 className={styles.heading}>
 *       This is underlined AND red!
 *     </h1>
 * ...
 * ```
 */
export default function mergeStyles(
  ...styleObjects: Record<string, string>[]
): Record<string, string> {
  if (styleObjects.length === 0) return {};

  let mergedStyles: Record<string, string> = styleObjects[0];

  styleObjects.slice(1).map(obj => {
    Object.keys(obj).map(key => {
      if (mergedStyles[key] === undefined) {
        mergedStyles[key] = obj[key];
      } else {
        mergedStyles[key] += " " + obj[key];
      }
    })
  });

  return mergedStyles;
}