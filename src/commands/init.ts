import { flags } from '@oclif/command'
import { debug as debugInit } from 'debug'
const yarnOrNpm = require('yarn-or-npm')
import * as execa from 'execa'
import * as path from 'path'
import * as ora from 'ora'

import Base from '../shared/base'
import { askFor } from '../shared/prompts'

const debug = debugInit('rcli:init')

class ReactCli extends Base {
  static description = 'Start scaffolding'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    outputDir: flags.string({ char: 'o' })
  }

  static args = [{ name: 'outputDir' }]

  static strict = false

  async run () {
    const { args, flags } = this.parse(ReactCli)
    debug('parsing args', args)
    debug('parsing flags', flags)

    if (!args.outputDir && !flags.outputDir) {
      args.outputDir = await askFor('outputDir')
    }

    const packageManager = yarnOrNpm.hasYarn() ? 'yarn' : 'npm'
    const installCommand = packageManager === 'yarn' ? 'add' : 'install'

    const outDir = path.join(process.cwd(), args.outputDir || flags.outputDir)

    const spinner = ora('Installing create-react-app').start()
    // await execa('npx', ['create-react-app', outDir])
    spinner.succeed()

    spinner.start('Installing dependencies')
    process.chdir(outDir)
    const { stdout } = await execa(packageManager, [
      installCommand,
      ...this.dependenciesList.antd
    ])
    console.log(stdout)
    spinner.succeed()
  }
}

export = ReactCli
