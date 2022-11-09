import Editor, { loader } from '@monaco-editor/react'
import type { EditorProps } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'

import shellWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
  getWorker() {
    return new shellWorker()
  }
}

loader.config({ monaco })
loader.init()

const CodeEditor: React.FC<EditorProps> = ({ ...rest }) => {
  return <Editor defaultLanguage="shell" {...rest} />
}

export default CodeEditor
