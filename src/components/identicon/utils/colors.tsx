import { ss58, hashers } from 'capi'
import { findScheme, SCHEMA } from './scheme'

/*
  A generic identity icon, taken from
  https://github.com/polkadot-js/ui/tree/master/packages/react-identicon
*/

const Blake2_512 = new hashers.Blake2Hasher(512 as any, false)

const zeroHash = Blake2_512.hash(new Uint8Array(32))

function addressToId(address: string): Uint8Array {
  const [, pubKey] = ss58.decode(address) as [
    prefix: number,
    pubKey: Uint8Array,
  ]

  return Blake2_512.hash(pubKey).map((x, i) => (x + 256 - zeroHash[i]) % 256)
}

export function getColorsNew(address: string): string[] {
  const total = Object.values(SCHEMA)
    .map((s): number => s.freq)
    .reduce((a, b): number => a + b)
  const id = addressToId(address)
  const d = Math.floor((id[30] + id[31] * 256) % total)
  const rot = (id[28] % 6) * 3
  const sat = Math.floor((id[29] * 70) / 256 + 26) % 80
  const alignedSat = sat < 40 ? sat + 50 : sat < 70 ? sat + 30 : sat
  const scheme = findScheme(d)
  const palette = Array.from(id).map((x, i): string => {
    const b = (x + (i % 28) * 58) % 256

    if (b === 0) {
      return '#444'
    } else if (b === 255) {
      return 'transparent'
    }

    const h = Math.floor(((b % 64) * 360) / 64)
    const l = [40, 45, 50, 55][Math.floor(b / 64)]

    return `hsl(${h}, ${alignedSat}%, ${l}%)`
  })

  return scheme.colors.map(
    (_, i): string => palette[scheme.colors[i < 18 ? (i + rot) % 18 : 18]],
  )
}

export function getColors(address: string): string[] {
  const total = Object.values(SCHEMA)
    .map((s): number => s.freq)
    .reduce((a, b): number => a + b)
  const id = addressToId(address)
  const d = Math.floor((id[30] + id[31] * 256) % total)
  const rot = (id[28] % 6) * 3
  const sat = (Math.floor((id[29] * 70) / 256 + 26) % 80) + 30
  const scheme = findScheme(d)
  const palette = Array.from(id).map((x, i): string => {
    const b = (x + (i % 28) * 58) % 256

    if (b === 0) {
      return '#444'
    } else if (b === 255) {
      return 'transparent'
    }

    const h = Math.floor(((b % 64) * 360) / 64)
    const l = [53, 15, 35, 75][Math.floor(b / 64)]

    return `hsl(${h}, ${sat}%, ${l}%)`
  })

  return scheme.colors.map(
    (_, i): string => palette[scheme.colors[i < 18 ? (i + rot) % 18 : 18]],
  )
}
