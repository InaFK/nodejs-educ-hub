import { handleError } from '../utils/error-handler.js';
import { readdir, stat } from 'fs/promises';
import path from 'path';

//- go upper
export const goUp = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  if (parentDir !== currentDir) {
    return parentDir;
  }
  handleError('Operation failed: You are at the root directory.');
  return currentDir;
};

//- change dir
export const changeDirectory = async (currentDir, newDir) => {
  const fullPath = path.isAbsolute(newDir) ? newDir : path.join(currentDir, newDir);
  try {
    const dirStat = await stat(fullPath);
    if (dirStat.isDirectory()) {
      return fullPath;
    } else {
        handleError('Invalid input: Not a directory.');
    }
  } catch (err) {
    handleError('Operation failed: Directory not found.');
  }
  return currentDir;
};

//- list dir
export const listDirectoryContents = async (directory) => {
  try {
    const files = await readdir(directory, { withFileTypes: true });
    const folders = [];
    const filesList = [];

    files.forEach(file => {
      if (file.isDirectory()) {
        folders.push(file.name);
      } else {
        filesList.push(file.name);
      }
    });

    //- sort alphabetically
    folders.sort();
    filesList.sort();

    console.log('Folders:');
    folders.forEach(folder => console.log(folder));

    console.log('Files:');
    filesList.forEach(file => console.log(file));

  } catch (error) {
    handleError('Operation failed');
  }
};
