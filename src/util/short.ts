export function shortAddress(address: string, accountNameLength: number = 0) {
  const tail = accountNameLength < 12 ? 8 : 4
  const prefix = address.slice(0, tail)
  const suffix = address.slice(-tail)
  return `${prefix}...${suffix}`
}

export function shortAccountName(accountName: string = 'unknown') {
  if (accountName.length < 16) {
    return accountName
  }
  return `${accountName.slice(0, 15)}...`
}
