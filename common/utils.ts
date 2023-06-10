export function u8aToHex(uint8Array: Uint8Array): string {
  let hexString = ""

  for (let i = 0; i < uint8Array.length; i++) {
    const hex = uint8Array[i]?.toString(16).padStart(2, "0")!
    hexString += hex
  }

  return hexString
}
