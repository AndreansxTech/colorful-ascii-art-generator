export function convertToAscii(imageData) {
    const asciiChars = '@%#*+=:-. '; // Simplified character set based on intensity only
    const width = imageData.width;
    const height = imageData.height;
    let asciiArt = [];

    for (let y = 0; y < height; y++) {
        let line = [];
        for (let x = 0; x < width; x++) {
            const pixelIndex = (y * width + x) * 4;
            const r = imageData.data[pixelIndex];
            const g = imageData.data[pixelIndex + 1];
            const b = imageData.data[pixelIndex + 2];

            // Calculate brightness for character selection
            const brightness = (r + g + b) / 3;
            const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
            
            // Store character and its color
            line.push({
                char: asciiChars[charIndex],
                color: `rgb(${r},${g},${b})`
            });
        }
        asciiArt.push(line);
    }

    return asciiArt;
}