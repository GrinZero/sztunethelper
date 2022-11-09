export const HOST_PATH =
  process.platform === 'win32'
    ? `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts`
    : '/etc/hosts'

export const CONTENT_START = '# --- NET_HELPER-START ---'
