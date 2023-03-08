export function shortAddress(address: string) {
  return address.slice(0, 12) + '..' + address.slice(address.length - 12)
}
