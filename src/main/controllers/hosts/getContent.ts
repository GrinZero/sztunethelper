import { Host } from './type'
import { CONTENT_START } from './contants'

const getContent = (list: Host[]) => {
  const content = list
    .filter((item) => item.open)
    .map((item) =>
      item.type === 'system'
        ? `${item.content}\n${CONTENT_START}`
        : `\n# --- ${item.name}  ---\n${item.content}\n`
    )
    .join('\n')

  return content
}

export default getContent
