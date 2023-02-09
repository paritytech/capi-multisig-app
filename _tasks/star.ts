import * as fs from "std/fs/mod.ts"
import * as path from "std/path/mod.ts"

let generated = ""
for await (
  const entry of fs.walk(".", {
    match: [/\.ts$/],
    skip: [/^target\//],
  })
) {
  generated += `import ${JSON.stringify(`../${entry.path}`)};\n`
}

const dir = path.join(Deno.cwd(), "target")
await fs.ensureDir(dir)
const dest = path.join(dir, "star.ts")
console.log(`Writing "${dest}".`)
await Deno.writeTextFile(dest, generated)
