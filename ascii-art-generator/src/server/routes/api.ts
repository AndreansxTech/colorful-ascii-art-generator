import { Router } from 'express';
import { ImageService } from '../services/imageService';

const router = Router();
const imageService = new ImageService();

router.post('/upload', async (req, res) => {
    try {
        const imageData = req.body.image; // Assuming image data is sent in the request body
        const asciiArt = await imageService.processImage(imageData);
        res.json({ asciiArt });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process image' });
    }
});

export function setupRoutes(app) {
    app.use('/api', router);
}