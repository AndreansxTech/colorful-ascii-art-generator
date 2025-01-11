// asciiConverter.ts

export function convertToAscii(imageData: ImageData): string {
    const asciiChars = '@%#*+=-:. '; // Characters used for ASCII art
    const { width, height, data } = imageData;
    let asciiArt = '';

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4; // Get the pixel index
            const brightness = (data[index] + data[index + 1] + data[index + 2]) / 3; // Calculate brightness
            const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1)); // Map brightness to ASCII character
            asciiArt += asciiChars[charIndex];
        }
        asciiArt += '\n'; // New line for each row
    }

    return asciiArt;
}