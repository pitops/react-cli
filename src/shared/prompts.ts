import { promptWrapper } from './utils'
import * as chalk from 'chalk'

export interface IPromptConfig {
  config: any
  tip?: string
}

const prompts: { [key: string]: IPromptConfig } = {
  outputDir: {
    config: {
      type: 'input',
      name: 'directory',
      message: 'Please specify output directory',
      validate: (value: string) => {
        if (!value) return 'Output directory name cannot be empty'
        return true
      }
    },
    tip: `Tip: You can specify this with ${chalk.red(
      'rcli init <project-directory>'
    )} in the future`
  }
}

export const askFor = async (parameter: string) => {
  return promptWrapper(prompts[parameter])
}
