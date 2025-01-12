// Define all functions with 'export'
export function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.onerror = (error) => {
                reject(error);
            };
            img.src = event.target.result;
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

export function getImageData(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return {
        width: Math.floor(srcWidth * ratio),
        height: Math.floor(srcHeight * ratio)
    };
}

function calculateOptimalDimensions(width, height) {
    const maxWidth = 200;
    const maxHeight = 100;
    const minWidth = 40;
    const minHeight = 20;
    
    // Calculate base ratio that would fit maxWidth
    let targetWidth = Math.min(Math.max(Math.floor(width / 8), minWidth), maxWidth);
    let targetHeight = Math.floor((targetWidth * height) / width);
    
    // If height is too large, recalculate based on height
    if (targetHeight > maxHeight) {
        targetHeight = maxHeight;
        targetWidth = Math.floor((targetHeight * width) / height);
    } else if (targetHeight < minHeight) {
        targetHeight = minHeight;
        targetWidth = Math.floor((targetHeight * width) / height);
    }
    
    return { width: targetWidth, height: targetHeight };
}

export async function processImage(file) {
    const image = await loadImage(file);
    const dimensions = calculateOptimalDimensions(image.width, image.height);
    
    const canvas = document.createElement('canvas');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    
    return context.getImageData(0, 0, dimensions.width, dimensions.height);
}