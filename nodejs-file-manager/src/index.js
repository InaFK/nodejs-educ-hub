import { homedir } from 'os';
import { stdin } from 'process';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';

const homeDir = homedir();
let currentDir = homeDir;

//- welcome message
console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

stdin.on('data', (data) => {
  const input = data.toString().trim();

  //- handle `.exit`
  if (input === '.exit') {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  }
  console.log(`You are currently in ${currentDir}`);
});
