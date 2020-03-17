import Command from '@oclif/command'
import { cosmiconfig } from 'cosmiconfig'
import { debug as debugInit } from 'debug'

import { DependenciesList } from './dependencies'

const debug = debugInit('rcli:base')
const explorer = cosmiconfig('rcli')

type ConfigType = {}

export default abstract class Base extends Command {
  static config: ConfigType

  dependenciesList: { [key: string]: string[] } = DependenciesList

  async init () {
    const { config, filepath } = (await explorer.search()) || {}
    debug('parsing config', { config, filepath })
    this.config = config
  }
}
