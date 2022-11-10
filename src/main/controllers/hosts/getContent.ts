import { Host } from './type'

const getContent = (list: Host[]) => {
  const content = list
    .filter((item) => item.open)
    .map((item) => `\n# --- ${item.name}  ---\n${item.content}\n`)
    .join('\n')

  return content
}

export default getContent
