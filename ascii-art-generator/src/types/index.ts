// src/types/index.ts

export interface ImageData {
    width: number;
    height: number;
    pixels: Uint8ClampedArray; // Assuming RGBA format
}

export interface AsciiArt {
    art: string;
    colors: string[]; // Array of color codes corresponding to ASCII characters
}