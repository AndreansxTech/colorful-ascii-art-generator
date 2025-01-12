export function mapColors(asciiArt, useColor = true) {
    const maxWidth = Math.max(...asciiArt.map(line => line.length));
    
    let fontSize = '12px';
    if (maxWidth > 150) fontSize = '6px';
    else if (maxWidth > 100) fontSize = '8px';
    else if (maxWidth > 50) fontSize = '10px';

    const coloredLines = asciiArt.map(line => {
        return line.map(pixel => {
            if (pixel.char === ' ') return ' ';
            const color = useColor ? pixel.color : '#FFFFFF';
            return `<span style="color: ${color};">${pixel.char}</span>`;
        }).join(' '); // Add space between characters
    }).join('\n');

    return `<div style="font-size: ${fontSize};">${coloredLines}</div>`;
}