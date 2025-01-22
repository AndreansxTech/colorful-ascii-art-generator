const CHAR_SETS = {
    standard: '@%#*+=:-. ',
    detailed: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ',
    blocks: '█▀▄▌▐░⎸⎹ ',
    simple: '#@:. ',
    binary: '01',
    shades: '█▓▒░ ',
    braille: '⠁⠃⠇⠏⠟⠿⡿⣿',
    numbers: '0123456789'
};

export function convertToAscii(imageData, options = {}) {
    const {
        charSet = 'standard',
        invert = false
    } = options;

    const chars = CHAR_SETS[charSet] || CHAR_SETS.standard;
    const charsArray = invert ? chars.split('').reverse().join('') : chars;
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
            const charIndex = Math.floor((brightness / 255) * (charsArray.length - 1));
            
            // Store character and its color
            line.push({
                char: charsArray[charIndex],
                color: `rgb(${r},${g},${b})`
            });
        }
        asciiArt.push(line);
    }

    return asciiArt;
}
