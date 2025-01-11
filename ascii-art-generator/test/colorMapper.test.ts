import { mapColors } from '../src/client/scripts/colorMapper';

describe('Color Mapper', () => {
    it('should map colors correctly from image data to ASCII characters', () => {
        const imageData = [
            { r: 255, g: 0, b: 0 }, // Red
            { r: 0, g: 255, b: 0 }, // Green
            { r: 0, g: 0, b: 255 }, // Blue
        ];
        const asciiChars = ['@', '#', '%'];

        const result = mapColors(imageData, asciiChars);

        expect(result).toEqual([
            { char: '@', color: { r: 255, g: 0, b: 0 } },
            { char: '#', color: { r: 0, g: 255, b: 0 } },
            { char: '%', color: { r: 0, g: 0, b: 255 } },
        ]);
    });

    it('should return an empty array when no image data is provided', () => {
        const result = mapColors([], []);
        expect(result).toEqual([]);
    });
});