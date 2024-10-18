const minMantissa = 1000000000000000n
const maxMantissa = 9999999999999999n
const minExponent = -96
const maxExponent = 80

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function makeXfl(exponent: any, mantissa: any) {
  // convert types as needed
  if (typeof exponent != 'bigint') exponent = BigInt(exponent)

  if (typeof mantissa != 'bigint') mantissa = BigInt(mantissa)

  // canonical zero
  if (mantissa == 0n) return 0n

  // normalize
  const is_negative = mantissa < 0
  if (is_negative) mantissa *= -1n

  while (mantissa > maxMantissa) {
    mantissa /= 10n
    exponent++
  }
  while (mantissa < minMantissa) {
    mantissa *= 10n
    exponent--
  }

  // canonical zero on mantissa underflow
  if (mantissa == 0) return 0n

  // under and overflows
  if (exponent > maxExponent || exponent < minExponent) return -1 // note this is an "invalid" XFL used to propagate errors

  exponent += 97n

  let xfl = !is_negative ? 1n : 0n
  xfl <<= 8n
  xfl |= BigInt(exponent)
  xfl <<= 54n
  xfl |= BigInt(mantissa)

  return xfl
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getExponent(xfl: any) {
  if (xfl < 0n) throw 'Invalid XFL'
  if (xfl == 0n) return 0n
  return ((xfl >> 54n) & 0xffn) - 97n
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMantissa(xfl: any) {
  if (xfl < 0n) throw 'Invalid XFL'
  if (xfl == 0n) return 0n
  return xfl - ((xfl >> 54n) << 54n)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNegative(xfl: any) {
  if (xfl < 0n) throw 'Invalid XFL'
  if (xfl == 0n) return false
  return ((xfl >> 62n) & 1n) == 0n
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toString(xfl: any) {
  if (xfl < 0n) throw 'Invalid XFL'
  if (xfl == 0n) return '<zero>'
  return (
    (isNegative(xfl) ? '-' : '+') +
    getMantissa(xfl).toString() +
    'E' +
    getExponent(xfl).toString()
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function floatToXfl(fl: any) {
  let e = 0
  let d = '' + parseFloat('' + fl)
  d = d.toLowerCase()
  let s = d.split('e')
  if (s.length == 2) {
    e = parseInt(s[1])
    d = s[0]
  }
  s = d.split('.')
  if (s.length == 2) {
    d = d.replace('.', '')
    e -= s[1].length
  } else if (s.length > 2) d = BigInt(0).toString()

  return makeXfl(e, d)
}

export function floatToLEXfl(fl: string): string {
  const xfl = floatToXfl(fl)
  return flipBeLe(xfl as bigint)
}

export function flipBeLe(endian: bigint): string {
  const hexString = endian.toString(16).toUpperCase()
  let flippedHex = ''
  for (let i = hexString.length - 2; i >= 0; i -= 2) {
    flippedHex += hexString.slice(i, i + 2)
  }
  return flippedHex
}

export function flipHex(hexString: string): string {
  let flippedHex = ''
  for (let i = hexString.length - 2; i >= 0; i -= 2) {
    flippedHex += hexString.slice(i, i + 2)
  }
  return flippedHex
}
