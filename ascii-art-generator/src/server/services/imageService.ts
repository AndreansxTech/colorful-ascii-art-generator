import fs from 'fs';
import path from 'path';

class ImageService {
    private imagesDir: string;

    constructor() {
        this.imagesDir = path.join(__dirname, '../../uploads');
        this.createUploadsDir();
    }

    private createUploadsDir() {
        if (!fs.existsSync(this.imagesDir)) {
            fs.mkdirSync(this.imagesDir, { recursive: true });
        }
    }

    public saveImage(imageName: string, imageData: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.imagesDir, imageName);
            fs.writeFile(filePath, imageData, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(filePath);
            });
        });
    }

    public getImage(imageName: string): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.imagesDir, imageName);
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
}

export default new ImageService();