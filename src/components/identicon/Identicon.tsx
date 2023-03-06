import classNames from 'clsx'
import { useCallback } from 'preact/hooks'
import {
  Circle,
  getCircleXY,
  OUTER_CIRCLE,
  renderCircle,
  Z,
} from './utils/circles'
import { getColors } from './utils/colors'

interface IdenticonProps {
  size: number
  value: string
  disableCursorCopy?: boolean
  disableClipboardCopy?: boolean
  colors?: string[]
  className?: string
}

/*
  A generic identity icon, taken from
  https://github.com/polkadot-js/ui/tree/master/packages/react-identicon
*/

export const Identicon = ({
  size,
  value: address,
  disableCursorCopy = false,
  disableClipboardCopy = false,
  colors: initialColors,
  className,
}: IdenticonProps) => {
  const xy = getCircleXY()

  const defaultColors =
    initialColors || new Array<string>(xy.length).fill('#ddd')

  const colors = address ? initialColors || getColors(address) : defaultColors

  const copyToClipboard = useCallback(() => {
    if (disableClipboardCopy) {
      return
    }
    if (navigator) {
      navigator.clipboard.writeText(address)
    }
  }, [address])

  return (
    <div
      onClick={copyToClipboard}
      className={classNames({
        'cursor-copy': !(disableCursorCopy || disableClipboardCopy),
        className,
      })}
    >
      <svg
        height={size}
        id={address}
        name={address}
        viewBox="0 0 64 64"
        width={size}
      >
        {[OUTER_CIRCLE]
          .concat(
            xy.map(
              ([cx, cy], index): Circle => ({
                cx,
                cy,
                fill: colors[index],
                r: Z,
              }),
            ),
          )
          .map(renderCircle)}
      </svg>
    </div>
  )
}
