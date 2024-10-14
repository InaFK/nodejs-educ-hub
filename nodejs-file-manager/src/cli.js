import { stdin } from 'process';
import { goUp, changeDirectory, listDirectoryContents } from './commands/navigation.js';
import { createFile, renameFile, copyFile, moveFile, deleteFile, readFileContent } from './commands/file-operations.js';
import { handleError } from './utils/error-handler.js';
import { compressFile, decompressFile } from './commands/compression.js';
import { calculateHash } from './commands/hash.js';

export const handleCLI = (username, homeDir) => {
  let currentDir = homeDir;

  const printCurrentDirectory = () => {
    console.log(`You are currently in ${currentDir}`);
  };

  console.log(`Welcome to the File Manager, ${username}!`);
  printCurrentDirectory();

  //- listen for commands
  stdin.on('data', async (data) => {
    const input = data.toString().trim();
    const [command, ...args] = input.split(' ');

    //- handle `.exit`
    if (input === '.exit') {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    }

    //- handle hash
    if (command === 'hash') {
        const filePath = args[0];
        if (filePath) {
          await calculateHash(filePath);
        } else {
          console.log('Invalid input. Usage: hash <path_to_file>');
        }
        printCurrentDirectory();
        return;
      }

    try {
        switch (command) {
            case 'up':
                currentDir = goUp(currentDir);
                break;

            case 'cd':
                if (args[0]) {
                currentDir = await changeDirectory(currentDir, args[0]);
                } else {
                    handleError('Invalid input: No directory provided.');
                }
                break;

            case 'ls':
                await listDirectoryContents(currentDir);
                break;

            case 'cat':
                if (args[0]) {
                    await readFileContent(currentDir, args[0]);
                } else {
                    handleError('Invalid input: No file path provided.');
                }
                break;

            case 'add':
                if (args[0]) {
                    await createFile(currentDir, args[0]);
                } else { 
                    handleError('Invalid input: No file name provided.');
                }
                break;
        
            case 'rn':
                if (args[0] && args[1]) {
                    await renameFile(currentDir, args[0], args[1]);
                }
                else {
                    handleError('Invalid input: Provide old and new file names.');
                }
                break;

            case 'cp':
                if (args[0] && args[1]) {
                    await copyFile(currentDir, args[0], args[1]);
                }
                else {
                    handleError('Invalid input: Provide source file and destination directory.');
                }
                break;
        
            case 'mv':
                if (args[0] && args[1]) {
                    await moveFile(currentDir, args[0], args[1]);
                }
                else {
                    handleError('Invalid input: Provide source file and destination directory.');
                }
                break;
        
            case 'rm':
                if (args[0]) {
                    await deleteFile(currentDir, args[0]);
                } else {
                    handleError('Invalid input: No file path provided.');
                }
                break;

            case 'compress':
                if (args[0] && args[1]) {
                    await compressFile(currentDir, args[0], args[1]);
                }
                else {
                    handleError('Invalid input: Provide source file and destination path.');
                }
                break;
            
            case 'decompress':
                if (args[0] && args[1]) {
                    await decompressFile(currentDir, args[0], args[1]);
                }
                else {
                    handleError('Invalid input: Provide compressed file and destination path.');
                }
                break;

            default:
                handleError('Invalid input: Unknown command.');
        }
    } catch (err) {
        handleError('Operation failed: An error occurred.');
    }

    printCurrentDirectory();
  });
};
