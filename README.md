# Binary Models

Binary models allow data to be serialized and deserialized as binary hex using a binary codec. The base model provides abstract methods for getting metadata and encoding data. Custom models can be derived from the base model and implement their own metadata and encoding methods.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Types](#types)
- [Encoding Functions](#encoding-functions)
- [Decoding Functions](#decoding-functions)
- [License](#license)

## Installation

To use the binary-models repo, you can install the package via npm or yarn:

```bash
yarn add @transia/binary-models
```

## Usage

Import the necessary functions from the package and use them in your project as needed.

```typescript
import { uint8ToHex, hexToUInt8 } from '@transia/binary-models';

// Example usage
const hexValue = uint8ToHex(10);
const intValue = hexToUInt8('0A');
```

### Types

The binary serialization format supports several types, some of which can be used to represent data commonly used in blockchain applications. 

- `uint8`: an unsigned 8-bit integer, represented by a single byte.
- `uint32`: an unsigned 32-bit integer, represented by four bytes in little-endian order.
- `uint64`: an unsigned 64-bit integer, represented by eight bytes in little-endian order.
- `uint224`: an unsigned 224-bit integer, represented by 28 bytes in little-endian order.
- `varString`: a string with a variable length, represented by a length prefix followed by the raw bytes of the string. The length prefix consists of either two or four bytes (depending on the length of the string) and indicates the number of raw bytes in the string. The maximum length of the string can be specified with the `maxStringLength` property in the metadata.
- `hash256`: a hash value represented by 64 bytes.
- `publicKey`: a public key represented by 66 bytes.
- `currency`: a xrpl currency, represented by a 20-byte hash value with a prefix.
- `xrpAddress`: an address, represented by a 20-byte hash value with a version prefix. The hash
represents the public key of the address, while the version prefix (currently `0x00`) indicates the network the address is associated with. The full address is usually represented in base58 format.
- `xfl`: Floating point numbers are widely used in computer science to do calculation of finite precision but arbitrary scale numbers.
- `model`: a nested model that consists of other metadata elements. The value is represented by the binary hex representation of the nested model. The nested model's structure must be defined using metadata elements in the parent model's `getMetadata()` method, and the `modelClass` property must specify the class of the nested model.
- `varModelArray`: an array of nested models with a variable length. The array length is represented by a length prefix of either two or four bytes, followed by the binary hex representation of each nested model. The maximum length of the array can be specified with the `maxArrayLength` property in the metadata.

The `getMetadata()` method must be implemented by any BaseModel subclass in order to provide the metadata for the model, specifying the field names and types along with any additional properties such as `maxStringLength`, `maxArrayLength`, and `modelClass`. `encode()` and `decode()` methods are provided for BaseModel to convert a model instance to or from its binary hex representation, using the `encodeModel()` and `decodeModel()` utility functions respectively.

## Encoding Functions

The following functions are available for encoding data types to hexadecimal format:

- `uint8ToHex(value: number): string` - Encodes a UInt8 value to hex.
- `uint16ToHex(value: number): string` - Encodes a UInt16 value to hex.
- `uint32ToHex(value: number): string` - Encodes a UInt32 value to hex.
- `uint64ToHex(value: BigInt): string` - Encodes a UInt64 value to hex.
- `uint224ToHex(value: BigInt): string` - Encodes a UInt224 value to hex.
- `varStringToHex(value: string): string` - Encodes a variable-length string to hex.
- `xflToHex(value: XFL): string` - Encodes an XFL value to hex.
- `currencyToHex(value: string): string` - Encodes a currency string to hex.
- `xrpAddressToHex(value: string): string` - Encodes an XRP address to hex.
- `lengthToHex(value: number, maxStringLength: number): string` - Encodes a length value to hex.

## Decoding Functions

The following functions are available for decoding hexadecimal format to data types:

- `hexToUInt8(hex: string): number` - Decodes a hex string to a UInt8 value.
- `hexToUInt16(hex: string): number` - Decodes a hex string to a UInt16 value.
- `hexToUInt64(hex: string): BigInt` - Decodes a hex string to a UInt64 value.
- `hexToUInt224(hex: string): BigInt` - Decodes a hex string to a UInt224 value.
- `hexToVarString(hex: string): string` - Decodes a hex string to a variable-length string.
- `hexToXfl(hex: string): XFL` - Decodes a hex string to an XFL value.
- `hexToCurrency(hex: string): string` - Decodes a hex string to a currency string.
- `hexToXRPAddress(hex: string): string` - Decodes a hex string to an XRP address.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.