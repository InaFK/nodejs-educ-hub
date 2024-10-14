import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import path from 'path';
import { handleError } from '../utils/error-handler.js';

export const compressFile = async (currentDir, sourceFile, destinationPath) => {
  try {
    const sourceFilePath = path.isAbsolute(sourceFile) ? sourceFile : path.join(currentDir, sourceFile);
    const destinationFilePath = path.isAbsolute(destinationPath) ? destinationPath : path.join(currentDir, destinationPath);

    const readable = createReadStream(sourceFilePath);
    const writable = createWriteStream(`${destinationFilePath}.br`);
    const brotli = createBrotliCompress();

    await pipeline(readable, brotli, writable);

    console.log(`File ${sourceFile} compressed successfully to ${destinationFilePath}.br`);
  } catch (error) {
    handleError('Operation failed: Could not compress file.');
  }
};

export const decompressFile = async (currentDir, compressedFile, destinationPath) => {
    try {
      const compressedFilePath = path.isAbsolute(compressedFile) ? compressedFile : path.join(currentDir, compressedFile);
      const destinationFilePath = path.isAbsolute(destinationPath) ? destinationPath : path.join(currentDir, destinationPath);
  
      const readable = createReadStream(compressedFilePath);
      const writable = createWriteStream(destinationFilePath);
      const brotli = createBrotliDecompress();
  
      await pipeline(readable, brotli, writable);
  
      console.log(`File ${compressedFile} decompressed successfully to ${destinationFilePath}`);
    } catch (error) {
      handleError('Operation failed: Could not decompress file.');
    }
};
