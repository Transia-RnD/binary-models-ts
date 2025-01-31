import {
  BaseModel,
  Metadata,
  decodeModel,
  hexToUInt16,
  hexToUInt32,
  hexToUInt64,
  hexToUInt224,
  hexToXfl,
  XFL,
} from '../../../dist/npm/src'

describe('decode', () => {
  describe('UInt16', () => {
    test('single digit', () => {
      const value = 5
      const hex = '0500'
      expect(hexToUInt16(hex, true)).toBe(value)
    })

    test('double digit', () => {
      const value = 10
      const hex = '0A00'
      expect(hexToUInt16(hex, true)).toBe(value)
    })

    test('max digit', () => {
      const value = 65535
      const hex = 'FFFF'
      expect(hexToUInt16(hex, true)).toBe(value)
    })
  })
  describe('UInt32', () => {
    test('single digit', () => {
      const value = 5
      const hex = '05000000'
      expect(hexToUInt32(hex, true)).toBe(value)
    })

    test('double digit', () => {
      const value = 10
      const hex = '0A000000'
      expect(hexToUInt32(hex, true)).toBe(value)
    })

    test('max digit', () => {
      const value = 4294967295
      const hex = 'FFFFFFFF'
      expect(hexToUInt32(hex, true)).toBe(value)
    })
  })

  describe('UInt64', () => {
    test('single digit', () => {
      const value = BigInt(5)
      const hex = '0500000000000000'
      expect(hexToUInt64(hex, true)).toBe(value)
    })

    test('double digit', () => {
      const value = BigInt(10)
      const hex = '0A00000000000000'
      expect(hexToUInt64(hex, true)).toBe(value)
    })

    test('max digit', () => {
      const value = BigInt('18446744073709551615')
      const hex = 'FFFFFFFFFFFFFFFF'
      expect(hexToUInt64(hex, true)).toBe(value)
    })
  })

  describe('UInt224', () => {
    test('single digit', () => {
      const value = BigInt(5)
      const hex = '05000000000000000000000000000000000000000000000000000000'
      expect(hexToUInt224(hex, true)).toBe(value)
    })

    test('double digit', () => {
      const value = BigInt(10)
      const hex = '0A000000000000000000000000000000000000000000000000000000'
      expect(hexToUInt224(hex, true)).toBe(value)
    })

    test('max digit', () => {
      const value = BigInt(
        '26959946667150639794667015087019630673637144422540572481103610249215'
      )
      const hex = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
      expect(hexToUInt224(hex, true)).toBe(value)
    })
  })

  describe('hexToXfl', () => {
    test('float', () => {
      const testHex = '0080C6A47E8DC354'
      const expectedResult = 10
      expect(hexToXfl(testHex, true)).toBe(expectedResult)
    })
  })

  describe('decodeModel', () => {
    test('single xfl field', () => {
      const SampleModel = class extends BaseModel {
        value: XFL

        constructor(value: XFL) {
          super()
          this.value = value
        }

        getMetadata(): Metadata {
          return [{ field: 'value', type: 'xfl', little: true }]
        }
      }

      const sampleEncoded = '0080C6A47E8DC354'
      const sampleModelDecoded = decodeModel(sampleEncoded, SampleModel)
      const currencyExpected = 10
      expect(sampleModelDecoded.value).toBe(currencyExpected)
    })

    test('single xfl field 0', () => {
      const SampleModel = class extends BaseModel {
        value: XFL

        constructor(value: XFL) {
          super()
          this.value = value
        }

        getMetadata(): Metadata {
          return [{ field: 'value', type: 'xfl', little: true }]
        }
      }

      const sampleEncoded = '0000000000000000'
      const sampleModelDecoded = decodeModel(sampleEncoded, SampleModel)
      const currencyExpected = 0
      expect(sampleModelDecoded.value).toBe(currencyExpected)
    })
  })
})
