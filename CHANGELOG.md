## [1.0.0] - 2024-10-18

Initial Release

## [1.0.3] - 2025-01-29

### Added:
- export xlf tools

## [1.1.0] - 2025-01-31

### Added:
- Little Endian Conversion

### Breaking:
- `xflToHex(value)` & `hexToXFl(value)` now return the Big Endian by default. To get the Little Endian you need to do: `xflToHex(value, true)` and `hexToXFl(value, true)`