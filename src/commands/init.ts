import { Command, flags } from '@oclif/command'
import { debug as debugInit } from 'debug'
import * as execa from 'execa'
import * as path from 'path'
import Base from '../base'
import * as ora from 'ora'

import { askFor } from '../prompts'

const debug = debugInit('rcli:init')

class ReactCli extends Base {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: 'f' })
  }

  static args = [{ name: 'outputDir' }]

  static strict = false

  async run () {
    const { args, flags } = this.parse(ReactCli)
    debug('parsing args', args)
    debug('parsing flags', flags)

    if (!args.outputDir) {
      args.outputDir = await askFor('directory')
    }

    const outDir = path.join(process.cwd(), args.outputDir)

    const spinner = ora('Installing create-react-app').start()
    const { stdout } = await execa('npx', ['create-react-app', outDir])
    spinner.succeed()
  }
}

export = ReactCli
