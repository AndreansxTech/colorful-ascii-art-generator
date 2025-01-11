import { processImage } from '../src/client/scripts/imageProcessor';

describe('Image Processor', () => {
    it('should process an uploaded image file', async () => {
        const mockFile = new File([''], 'test-image.png', { type: 'image/png' });
        const result = await processImage(mockFile);
        
        expect(result).toBeDefined();
        expect(result).toHaveProperty('width');
        expect(result).toHaveProperty('height');
        expect(result).toHaveProperty('data');
    });

    it('should throw an error for unsupported file types', async () => {
        const mockFile = new File([''], 'test-image.txt', { type: 'text/plain' });
        
        await expect(processImage(mockFile)).rejects.toThrow('Unsupported file type');
    });
});