// src/client/scripts/colorMapper.ts

export function mapColors(asciiArt: string[], imageData: ImageData): string[] {
    const coloredAsciiArt: string[] = [];

    for (let i = 0; i < asciiArt.length; i++) {
        const line = asciiArt[i];
        let coloredLine = '';

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            const pixelIndex = (i * line.length + j) * 4; // Assuming each character corresponds to a pixel
            const r = imageData.data[pixelIndex];
            const g = imageData.data[pixelIndex + 1];
            const b = imageData.data[pixelIndex + 2];

            coloredLine += `<span style="color: rgb(${r}, ${g}, ${b});">${char}</span>`;
        }

        coloredAsciiArt.push(coloredLine);
    }

    return coloredAsciiArt;
}