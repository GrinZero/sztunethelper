export interface Host {
  name: string
  type: 'local' | 'remote'
  mode: 'edit' | 'readonly'
  open: boolean
  content: string
  url?: string
  updateTime?: number | null
  autoUpdate?: 'never' | '1m' | '5m' | '15m' | '30m' | '1h' | '1d' | '7d'
}
