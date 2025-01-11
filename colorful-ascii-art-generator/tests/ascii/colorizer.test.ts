import { Colorizer } from '../../src/ascii/colorizer';

describe('Colorizer', () => {
    let colorizer: Colorizer;

    beforeEach(() => {
        colorizer = new Colorizer();
    });

    test('should apply colors correctly to ASCII art', () => {
        const asciiArt = '...'; // Example ASCII art
        const colorPalette = ['#FF0000', '#00FF00', '#0000FF']; // Example color palette
        const expectedOutput = '...'; // Expected output after applying colors

        const result = colorizer.applyColors(asciiArt, colorPalette);
        expect(result).toBe(expectedOutput);
    });

    test('should handle empty ASCII art', () => {
        const asciiArt = '';
        const colorPalette = ['#FF0000', '#00FF00', '#0000FF'];

        const result = colorizer.applyColors(asciiArt, colorPalette);
        expect(result).toBe('');
    });

    test('should handle undefined color palette', () => {
        const asciiArt = '...'; // Example ASCII art

        const result = colorizer.applyColors(asciiArt, undefined);
        expect(result).toBe(asciiArt); // Should return the original ASCII art
    });
});