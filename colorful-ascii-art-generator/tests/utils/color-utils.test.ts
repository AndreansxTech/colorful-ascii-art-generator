import { getColorPalette } from '../../src/utils/color-utils';

describe('Color Utils', () => {
    it('should extract a color palette from an image', () => {
        const imagePath = 'path/to/test/image.png';
        const expectedPalette = ['#FFFFFF', '#000000', '#FF5733']; // Example expected colors

        const palette = getColorPalette(imagePath);

        expect(palette).toEqual(expectedPalette);
    });

    it('should return an empty array for an invalid image path', () => {
        const invalidImagePath = 'path/to/invalid/image.png';

        const palette = getColorPalette(invalidImagePath);

        expect(palette).toEqual([]);
    });
});