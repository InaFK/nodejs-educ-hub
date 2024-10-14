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

export const createFile = async (currentDir, fileName) => {
    try {
      const filePath = path.join(currentDir, fileName);
      const fileHandle = await fs.open(filePath, 'w');
      await fileHandle.close();
      console.log(`File ${fileName} created successfully`);
    } catch (error) {
      handleError('Operation failed: Could not create file.');
    }
};
  
export const renameFile = async (currentDir, oldFileName, newFileName) => {
    try {
      const oldPath = path.join(currentDir, oldFileName);
      const newPath = path.join(currentDir, newFileName);
      await fs.rename(oldPath, newPath);
      console.log(`File renamed from ${oldFileName} to ${newFileName}`);
    } catch (error) {
      handleError('Operation failed: Could not rename file.');
    }
};

export const copyFile = async (currentDir, sourceFile, destinationDir) => {
    try {
      const sourcePath = path.join(currentDir, sourceFile);
      const destinationPath = path.join(destinationDir, sourceFile);
      
      const readable = fs.createReadStream(sourcePath);
      const writable = fs.createWriteStream(destinationPath);
  
      readable.pipe(writable);
  
      readable.on('end', () => {
        console.log(`File ${sourceFile} copied to ${destinationDir}`);
      });
    } catch (error) {
      handleError('Operation failed: Could not copy file.');
    }
};  

export const moveFile = async (currentDir, sourceFile, destinationDir) => {
    try {
      await copyFile(currentDir, sourceFile, destinationDir);
      await deleteFile(currentDir, sourceFile);
      console.log(`File ${sourceFile} moved to ${destinationDir}`);
    } catch (error) {
      handleError('Operation failed: Could not move file.');
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
