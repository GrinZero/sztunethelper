import { Host } from '@renderer/api'

// TODO: 在electron和web共享代码
export const CONTENT_START = '# --- NET_HELPER-START ---'
const getHostsContent = (list: Host[]) => {
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

export default getHostsContent
