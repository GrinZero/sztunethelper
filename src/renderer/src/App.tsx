import './tailwind.css'
import 'magic-design-react/dist/index.esm.css'
import './assets/iconfont/iconfont'
import '@arco-design/web-react/dist/css/arco.css'

import './global.scss'
import './App.css'

import './extension'

import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { TopBar, Main, SelfHelp, Login, Setting, AboutUS, MessagePage, MailConfig } from './pages'
import { useEffect } from 'react'
import store, { initAccount } from './store'
import { useConfig } from './hooks'

const App = () => {
  useEffect(() => {
    store.dispatch(initAccount())
  }, [])
  useConfig()

  return (
    <Router>
      <Redirect to="/index" path="/" exact={true} />
      <Route path="/">
        <TopBar type="mac" />
        <Main />
        <SelfHelp />
      </Route>
      <Switch>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/setting" exact={true}>
          <Setting />
        </Route>
        <Route path="/about_us" exact={true}>
          <AboutUS />
        </Route>
        <Route path="/message" exact={true}>
          <MessagePage />
        </Route>
        <Route path="/mail_config" exact={true}>
          <MailConfig />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
