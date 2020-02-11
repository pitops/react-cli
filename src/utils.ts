import { prompt } from 'enquirer'

interface IPromptFor {
  config: any
  tip?: string
}

export const promptFor = async ({ config, tip }: IPromptFor) => {
  return await prompt(config)
    .then((value: any) => value[config.name])
    .catch((error: any) => console.error(error.message))
    .finally(() => (tip ? console.log(tip) : undefined))
}
