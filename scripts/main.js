import { processImage } from './imageProcessor.js';
import { convertToAscii } from './asciiConverter.js';
import { mapColors } from './colorMapper.js';

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generateButton');
    const fileInput = document.getElementById('imageUpload');
    const output = document.getElementById('asciiArtOutput');
    const downloadButton = document.getElementById('downloadButton');
    const colorToggle = document.getElementById('colorToggle');
    const bgToggle = document.getElementById('bgToggle');
    const uploadText = document.getElementById('uploadText');
    const copyButton = document.getElementById('copyButton');

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            uploadText.textContent = e.target.files[0].name;
        } else {
            uploadText.textContent = 'Click here to upload a image';
        }
    });

    function downloadAsImage() {
        const element = output;
        const originalBg = element.style.backgroundColor;
        const backgroundColor = bgToggle.checked ? '#FFFFFF' : '#1a1a1a';
        const textColor = bgToggle.checked ? '#000000' : '#FFFFFF';
        const tempContainer = document.createElement('div');
        Object.assign(tempContainer.style, {
            position: 'fixed',
            left: '-9999px',
            top: '-9999px',
            backgroundColor: backgroundColor,
            padding: '20px',
            width: 'auto',
            whiteSpace: 'pre',
            fontFamily: 'monospace',
            lineHeight: '1.15',
            fontSize: window.getComputedStyle(element.firstElementChild || element).fontSize
        });

        const content = element.innerHTML;
        if (!colorToggle.checked) {
            tempContainer.innerHTML = `<div style="display: inline-block; text-align: left; color: ${textColor};">${content}</div>`;
        } else {
            tempContainer.innerHTML = `<div style="display: inline-block; text-align: left;">${content}</div>`;
        }
        
        document.body.appendChild(tempContainer);
        
        // get the actual content size
        const contentElement = tempContainer.firstElementChild;
        const rect = contentElement.getBoundingClientRect();
        
        html2canvas(tempContainer, {
            backgroundColor: backgroundColor,
            width: rect.width,
            height: rect.height,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'ascii-art.png';
            link.href = canvas.toDataURL();
            link.click();
            
            // Clean up
            document.body.removeChild(tempContainer);
        }).catch(error => {
            console.error('Error generating image:', error);
            document.body.removeChild(tempContainer);
        });
    }

    function copyToClipboard() {
        //create a temporary element with plain text content
        const tempElement = document.createElement('textarea');
        tempElement.style.position = 'fixed';
        tempElement.style.left = '-9999px';
        
        //extract text content without HTML tags
        const content = output.innerText;
        tempElement.value = content;
        
        document.body.appendChild(tempElement);
        tempElement.select();
        
        try {
            document.execCommand('copy');
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy to Clipboard';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        
        document.body.removeChild(tempElement);
    }

    generateButton.addEventListener('click', async () => {
        try {
            if (!downloadButton || !copyButton) {
                console.error('Required buttons not found');
                return;
            }

            if (fileInput.files.length > 0) {
                output.textContent = 'Processing the image....';
                generateButton.disabled = true;
                downloadButton.classList.add('hidden');
                copyButton.classList.add('hidden');
                
                const imageData = await processImage(fileInput.files[0]);
                const asciiArt = convertToAscii(imageData);
                const coloredAscii = mapColors(asciiArt, colorToggle.checked);
                
                output.innerHTML = coloredAscii;
                downloadButton.classList.remove('hidden');
                copyButton.classList.remove('hidden');
                copyButton.textContent = 'Copy to Clipboard';
            } else {
                output.textContent = 'Please select an image first';
            }
        } catch (error) {
            console.error('Error:', error);
            output.textContent = `Error: ${error.message}`;
        } finally {
            generateButton.disabled = false;
        }
    });

    downloadButton.addEventListener('click', downloadAsImage);
    copyButton.addEventListener('click', copyToClipboard);
});
