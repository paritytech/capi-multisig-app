import dev from "$fresh/dev.ts"
import "std/dotenv/load.ts"

await dev(import.meta.url, "./main.ts")
