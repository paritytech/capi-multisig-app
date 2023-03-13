export function shortAddress(address: string) {
  const prefix = address.slice(0, 12)
  const suffix = address.slice(-12)
  return `${prefix}..${suffix}`
}
