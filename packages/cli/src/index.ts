#!/usr/bin/env node
import { Command } from 'commander';
import { add } from './commands/add.js';
import { init } from './commands/init.js';

const program = new Command();

program
  .name('@arcstratus/cli')
  .description('Add Arcstratus UI components to your project')
  .version('0.0.1');

program
  .command('init')
  .description('Initialize Arcstratus UI in your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--cwd <path>', 'Working directory')
  .action(init);

program
  .command('add')
  .description('Add a component to your project')
  .argument('[components...]', 'components to add')
  .action(add);

program.parse();
