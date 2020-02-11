import { Command } from '@oclif/command'
import { cosmiconfig } from 'cosmiconfig'
import { debug as debugInit } from 'debug'

const debug = debugInit('rcli:base')
const explorer = cosmiconfig('rcli')

type ConfigType = {
  name?: string
}

export default abstract class Base extends Command {
  static config: ConfigType

  async init () {
    const externalConfig: any = await explorer.search()
    debug('parsing config', externalConfig.config, externalConfig.filepath)
    this.config = externalConfig.config
  }
}
