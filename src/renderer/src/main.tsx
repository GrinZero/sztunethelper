// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import WebApp from './WebApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>{window.bridge ? <App /> : <WebApp />}</Provider>
  // </React.StrictMode>
)
