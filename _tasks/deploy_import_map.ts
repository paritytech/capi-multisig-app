const importMap = JSON.parse(Deno.readTextFileSync("import_map.json"))

importMap.imports["http://localhost:4646/"] = "./target/capi/"

Deno.writeTextFileSync("import_map.json", JSON.stringify(importMap, 2))
