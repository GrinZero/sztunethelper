import { createHashHistory } from 'history'

const history = globalThis.document ? createHashHistory() : null
export { history }
export default history
