import {
  BaseModel,
  Metadata,
  encodeModel,
  uint16ToHex,
  uint32ToHex,
  uint64ToHex,
  uint224ToHex,
  xflToHex,
  XFL,
} from '../../../dist/npm/src'

describe('encode', () => {
  describe('UInt16', () => {
    test('single digit', () => {
      const value = 5
      const hex = '0500'
      expect(uint16ToHex(value, true)).toBe(hex)
    })

    test('double digit', () => {
      const value = 10
      const hex = '0A00'
      expect(uint16ToHex(value, true)).toBe(hex)
    })

    test('max digit', () => {
      const value = 65535
      const hex = 'FFFF'
      expect(uint16ToHex(value, true)).toBe(hex)
    })
  })
  describe('UInt32', () => {
    test('single digit', () => {
      const value = 5
      const hex = '05000000'
      expect(uint32ToHex(value, true)).toBe(hex)
    })

    test('double digit', () => {
      const value = 10
      const hex = '0A000000'
      expect(uint32ToHex(value, true)).toBe(hex)
    })

    test('max digit', () => {
      const value = 4294967295
      const hex = 'FFFFFFFF'
      expect(uint32ToHex(value, true)).toBe(hex)
    })
  })

  describe('UInt64', () => {
    test('single digit', () => {
      const value = BigInt(5)
      const hex = '0500000000000000'
      expect(uint64ToHex(value, true)).toBe(hex)
    })

    test('double digit', () => {
      const value = BigInt(10)
      const hex = '0A00000000000000'
      expect(uint64ToHex(value, true)).toBe(hex)
    })

    test('max digit', () => {
      const value = BigInt('18446744073709551615')
      const hex = 'FFFFFFFFFFFFFFFF'
      expect(uint64ToHex(value, true)).toBe(hex)
    })
  })

  describe('UInt224', () => {
    test('single digit', () => {
      const value = BigInt(5)
      const hex = '05000000000000000000000000000000000000000000000000000000'
      expect(uint224ToHex(value, true)).toBe(hex)
    })

    test('double digit', () => {
      const value = BigInt(10)
      const hex = '0A000000000000000000000000000000000000000000000000000000'
      expect(uint224ToHex(value, true)).toBe(hex)
    })

    test('max digit', () => {
      const value = BigInt(
        '26959946667150639794667015087019630673637144422540572481103610249215'
      )
      const hex = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
      expect(uint224ToHex(value, true)).toBe(hex)
    })
  })

  describe('xflToHex', () => {
    test('float', () => {
      const testXfl = 10
      const expectedResult = '0080C6A47E8DC354'
      expect(xflToHex(testXfl, true)).toBe(expectedResult)
    })
  })

  describe('encodeModel', () => {
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

      const value = 10
      const sample = new SampleModel(value)

      const hex = encodeModel(sample)
      expect(hex).toBe('0080C6A47E8DC354')
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

      const value = 0
      const sample = new SampleModel(value)

      const hex = encodeModel(sample)
      expect(hex).toBe('0000000000000000')
    })
  })
})
