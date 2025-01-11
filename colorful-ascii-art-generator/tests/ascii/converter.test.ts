import { AsciiConverter } from '../../src/ascii/converter';

describe('AsciiConverter', () => {
    let converter: AsciiConverter;

    beforeEach(() => {
        converter = new AsciiConverter();
    });

    test('should convert a valid image file to ASCII art', () => {
        const imageFile = 'path/to/test/image.png'; // Replace with a valid test image path
        const asciiArt = converter.convert(imageFile);
        expect(asciiArt).toBeDefined();
        expect(asciiArt).toMatch(/^[\s\S]*$/); // Check if it returns a string
    });

    test('should throw an error for an invalid image file', () => {
        const invalidFile = 'path/to/invalid/file.txt'; // Replace with an invalid test image path
        expect(() => converter.convert(invalidFile)).toThrow('Invalid file type');
    });

    // Add more tests as needed
});