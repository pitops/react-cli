import { Command, flags } from '@oclif/command'
import { debug as debugInit } from 'debug'
import { prompt } from 'enquirer'
import * as execa from 'execa'
import * as path from 'path'
import Base from '../base'

const debug = debugInit('rcli:init')
// const debug = require('debug')('rcli:init')

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

  static args = [{ name: 'file' }]

  static strict = false

  async run () {
    const { args, flags } = this.parse(ReactCli)
    debug('parsing args', args)
    debug('parsing flags', flags)

    // if (typeof flags.name === 'undefined') {
    //   if (this.config && this.config.name) {
    //     flags.name = this.config.name
    //   } else {
    //     flags.name = await prompt({
    //       type: 'input',
    //       name: 'name',
    //       message: 'What is your name?'
    //     })
    //       .then((value: any) => value.name)
    //       .catch((error: any) => console.error(error.message))
    //       .finally(() =>
    //         console.log('You can specify this with the --name flag in future')
    //       )
    //   }
    // }
    const outputFolder = flags.name ?? './test'
    const outDir = path.join(process.cwd(), outputFolder)

    const { stdout } = await execa('npx', ['create-react-app', outputFolder])
    this.log(stdout)
  }
}

export = ReactCli
