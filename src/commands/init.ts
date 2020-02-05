import { Command, flags } from '@oclif/command'
import { debug as debugInit } from 'debug'

const debug = debugInit('rcli:init')
// const debug = require('debug')('rcli:init')

class ReactCli extends Command {
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

  static args = [{ name: 'file' }]

  async run () {
    const { args, flags } = this.parse(ReactCli)
    debug('parsing args', args)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/index.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}

export = ReactCli
