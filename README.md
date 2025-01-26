# Binary Models

Binary models allow data to be serialized and deserialized as binary hex using a binary codec. The base model provides abstract methods for getting metadata and encoding data. Custom models can be derived from the base model and implement their own metadata and encoding methods.

### Encode & Decode

The `encode()` method uses the `encodeModel()` function to serialize a model instance into binary hex. This function iterates through each metadata element of the model, converting each field to its binary hex representation and concatenating the result into a final hex string.

The `static decode()` method uses the `decodeModel()` function to deserialize a binary hex string into a model instance. This function takes a hex string and a model class as its arguments. It then iterates through the metadata of the model class to extract each field's hex string representation from the full hex string, convert it back to its original type, and return a new instance of the model class with the deserialized field values.

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

