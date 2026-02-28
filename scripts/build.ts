/**
 * This script, written for the Deno runtime, takes the `*.glsl` files from
 * `src/webgl/shaders` and bundles them into a single file,
 * `src/webgl/shaders/index.ts`, which declares a constant for each of the
 * files named based on the filename.
 * 
 * File names are converted to JavaScript constant identifies by converting all
 * characters to upper case, then adding the suffix `_SOURCE` in place of the
 * file extension.
 * 
 * E.g., if you make a file named `cube_fshader.glsl`, then this build script
 * will declare a constant named `CUBE_FSHADER_SOURCE` in the `shaders.js`
 * file.
 * 
 * Since this function requires read/write access it must be run with those
 * permissions flags as shown below.
 * 
 * ```
 * deno run --allow-read --allow-write ./scripts/build.ts
 * ```
 */
async function build(
	shaderDirName: string, shaderOutput: string
) {

	//
	// Shader code bundle
	//

	const sourceFiles: string[] = []
	
	for await (const file of Deno.readDir(shaderDirName)) {
		if (file.isFile && file.name.endsWith(".glsl")) {
			sourceFiles.push(`${shaderDirName}/${file.name}`)
		}
	}

	let outputString = `/**
 * This file was created by running 
 * 
 * \`\`\`
 * deno --allow-read --allow-write scripts/build.ts
 * \`\`\`
 * 
 * All of the source code here corresponds to the files ending in \`.glsl\` that
 * were found in the \`${shaderDirName}\` directory.
 */

`
	for (const filePath of sourceFiles) {
		const shaderSourceCode = await Deno.readTextFile(filePath)
		const pathParts = filePath.split("/")
		const fileName = pathParts[pathParts.length - 1]
		// the `.glsl` extension is five characters long
		const baseName = fileName.substring(0, fileName.length - 5)
		const newName = baseName.toUpperCase() + "_SOURCE"

		outputString += `const ${newName} = \`${shaderSourceCode}\`\n`
	}

	const encoder = new TextEncoder()
	Deno.writeFile(shaderOutput, encoder.encode(outputString))
}

setInterval(
	() => build("src/webgl/shaders", "./src/webgl/shaders/index.ts"),
	1000
)
