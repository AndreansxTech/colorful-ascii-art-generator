import express from 'express';
import multer from 'multer';
import { AsciiConverter } from './ascii/converter';
import { Colorizer } from './ascii/colorizer';
import { uploadFile } from './utils/file-handler';

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const asciiConverter = new AsciiConverter();
        const asciiArt = await asciiConverter.convert(filePath);
        
        const colorizer = new Colorizer();
        const coloredAsciiArt = colorizer.applyColors(asciiArt, filePath);
        
        res.send({ asciiArt: coloredAsciiArt });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred during the conversion process.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});