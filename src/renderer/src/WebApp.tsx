import './tailwind.css'
import 'magic-design-react/dist/index.esm.css'
import './assets/iconfont/iconfont'
import '@arco-design/web-react/dist/css/arco.css'

import './global.scss'
import './App.css'

import './extension'

import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { MessagePage, MailConfig } from './pages'
import { useBaseData } from './api'
import { TopBar } from '@renderer/pages'
import { useConfig } from './hooks'
import { history } from '@renderer/utils'

export const WebApp = () => {
  useBaseData()
  useConfig()
  return (
    <Router history={history}>
      <TopBar type="mac" />
      <Switch>
        <Route path="/message" exact={true}>
          <MessagePage />
        </Route>
        <Route path="/mail_config" exact={true}>
          <MailConfig />
        </Route>
        <Redirect from="/*" to="/message" exact={true} />
      </Switch>
    </Router>
  )
}

export default WebApp
