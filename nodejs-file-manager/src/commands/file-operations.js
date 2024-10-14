import { handleError } from '../utils/error-handler.js';
import { promises as fs } from 'fs';
import path from 'path';

export const readFileContent = async (currentDir, filePath) => {
  try {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
    const data = await fs.readFile(fullPath, 'utf-8');
    console.log(data);
  } catch (error) {
    handleError('Operation failed: File not found or cannot be read.');
  }
};

export const deleteFile = async (currentDir, filePath) => {
  try {
    const fullPath = path.isAbsolute(filePath) ? filePath : path.join(currentDir, filePath);
    await fs.unlink(fullPath);
    console.log('File deleted successfully');
  } catch (error) {
    handleError('Operation failed: File not found or cannot be deleted.');
  }
};
