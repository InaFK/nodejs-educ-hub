import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { handleError } from '../utils/error-handler.js';

export const calculateHash = async (filePath) => {
    try {
        const hash = createHash('sha256');
        const inputStream = createReadStream(filePath);

        inputStream.on('data', (chunk) => {
            hash.update(chunk);
        });

        inputStream.on('end', () => {
            console.log(`Hash for file ${filePath}: ${hash.digest('hex')}`);
        });

        inputStream.on('error', (err) => {
            handleError(err);
        });
    } catch (error) {
        handleError(error);
    }
};
