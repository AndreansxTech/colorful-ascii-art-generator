# Colorful ASCII Art Generator

## Overview
Ever needed to place a image in your profile but couldn't because it did not allow images?
With ASCII art you can easily place any image in your profile only using text !
This interactive web application transforms images into ASCII art with real-time color mapping and customization options. 
I used modern web technologies to create an engaging and user-friendly experience for generating ASCII art from any image.
Please note that this isnt realy-well-made bacause it cannot process large images quickly. It works best for profile pictures around 200x200 to 500x500


## Features
### Core Functionality
- Convert any image to ASCII art
- Real-time color mapping based on original image colors
- Uses 18 colors
- Adjustable output size based on image dimensions
- Responsive and mobile-friendly design
- Download ASCII art as PNG

### Customization Options
- Toggle between color and monochrome output
- Switch between dark and light backgrounds for downloaded images
- Automatic font size adjustment based on output size
- Preserve aspect ratio during conversion

### User Interface
- Modern, intuitive interface with Tailwind CSS
- Interactive animations and effects
- Drag-and-drop file upload
- File name display after selection
- Progress feedback during processing
- Preview below: </br></br>

![Zrzut ekranu 2025-01-12 143553](https://github.com/user-attachments/assets/fc60d4e0-d084-480c-9b04-3c8e35ef24c8)



### Export Options
- Download the created ASCII art as a PNG image 
- Dark and light background for exports
- High-quality image quality
- Maintains formatting and spacing in exported files

## Technologies Used
- HTML5 & CSS3
- JavaScript (ES6+)
- Tailwind CSS for styling
- html2canvas for image export
- Module-based architecture
- Responsive design principles

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local development server ( optionally )

### Installation
1. Clone this repository:
   ```
   git clone https://github.com/AndreansxTech/colorful-ascii-art-generator.git
   ```
2. Navigate to the project directory:
   ```
   cd ascii-art-generator
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Open `public/index.html` in your browser.
2. Click on the upload area to select an image.
3. Click the "Generate ASCII Art!" button to see the result.

## Contributing
Feel free to submit issues or pull requests for improvements and bug fixes.

## License
This project is licensed under the MIT License.
