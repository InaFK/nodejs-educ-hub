import { homedir } from 'os';
import { handleCLI } from './cli.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'User';
const homeDir = homedir();

handleCLI(username, homeDir);

//- handle `Ctrl+C` (SIGINT)
process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit();
});
