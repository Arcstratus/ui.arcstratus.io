#!/usr/bin/env node
import { Command } from 'commander';
import { add } from './commands/add.js';

const program = new Command();

program
  .name('@arcstratus/cli')
  .description('Add Arcstratus UI components to your project')
  .version('0.0.1');

program
  .command('add')
  .description('Add a component to your project')
  .argument('[components...]', 'components to add')
  .action(add);

program.parse();
