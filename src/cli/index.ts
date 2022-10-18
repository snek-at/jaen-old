#!/usr/bin/env -S node
import {Command} from 'commander'

import packageJson from '../utils/packageJson.js'
import * as commands from './commands/index.js'
import {cliName} from './constants.js'

export const program = new Command()

program
  .name(cliName)
  .description('Snek Jaen CLI')
  .version(packageJson.version)

program
  .command('migrate')
  .aliases(['build'])
  .description('Migrate your jaen-data to a new version')
  .option(
    '-m, --migrationUrl <migration>',
    'Migration to run',
    process.env.JAEN_MIGRATION_URL
  )
  .option(
    '--jaen-data-dir <jaen-data-dir>',
    'Directory where your jaen-data is stored',
    './jaen-data'
  )
  .option('--dry-run', 'Run the command without making any changes', false)
  .action(commands.migrate)

program.parse()
