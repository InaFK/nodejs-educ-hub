import { stdin } from 'process';
import { goUp, changeDirectory, listDirectoryContents } from './commands/navigation.js';

export const handleCLI = (username, homeDir) => {
  let currentDir = homeDir;

  const printCurrentDirectory = () => {
    console.log(`You are currently in ${currentDir}`);
  };

  //- welcome message
  console.log(`Welcome to the File Manager, ${username}!`);
  printCurrentDirectory();

  //- listen for commands
  stdin.on('data', async (data) => {
    const input = data.toString().trim();

    //- handle `.exit`
    if (input === '.exit') {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    }

    const [command, ...args] = input.split(' ');

    switch (command) {
      case 'up':
        currentDir = goUp(currentDir);
        break;

      case 'cd':
        if (args[0]) {
          currentDir = await changeDirectory(currentDir, args[0]);
        } else {
          console.log('Invalid input');
        }
        break;

      case 'ls':
        await listDirectoryContents(currentDir);
        break;

      default:
        console.log('Invalid input');
    }

    printCurrentDirectory();
  });
};
