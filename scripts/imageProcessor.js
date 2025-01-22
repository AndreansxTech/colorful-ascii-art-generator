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

export function calculateOptimalDimensions(width, height, options = {}) {
    const {
        targetWidth = 100,
        targetHeight = 50,
        preserveAspectRatio = true,
        maxWidth = 200,
        maxHeight = 100
    } = options;

    if (preserveAspectRatio) {
        const ratio = Math.min(targetWidth / width, targetHeight / height);
        return {
            width: Math.floor(width * ratio),
            height: Math.floor(height * ratio)
        };
    }

    return {
        width: Math.min(targetWidth, maxWidth),
        height: Math.min(targetHeight, maxHeight)
    };
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
