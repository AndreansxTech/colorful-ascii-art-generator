import { promises as fs } from 'fs';
import path from 'path';

export async function uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadPath = path.join(__dirname, '../../uploads', file.originalname);
    await fs.writeFile(uploadPath, file.buffer);
    return uploadPath;
}

export async function readFile(filePath: string): Promise<string> {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
}