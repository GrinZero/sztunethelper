import './tailwind.css'
import 'magic-design-react/dist/index.esm.css'
import './assets/iconfont/iconfont'
import '@arco-design/web-react/dist/css/arco.css'

import './global.scss'
import './App.css'

import './extension'

import { useEffect } from 'react'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TopBar, Main, SelfHelp, Login, Setting, AboutUS, MessagePage } from './pages'

const { sendMessage } = window.bridge

const App = () => {
  const { theme } = useSelector((store: any) => store.base)
  useEffect(() => {
    sendMessage('themeChange', theme)
    document.documentElement.setAttribute('theme-mode', theme)
    document.body.setAttribute('arco-theme', theme)
  }, [theme])

  useEffect(() => {
    const { platform } = window.navigator
    if (platform.includes('Mac') || platform.includes('mac')) {
      document.documentElement.setAttribute('platform', 'mac')
    } else {
      document.documentElement.setAttribute('platform', 'windows')
    }
  })
  return (
    <Router>
      <Redirect to="/index" path="/" exact={true} />
      <Route path="/">
        <TopBar type="mac" />
        <Main />
      </Route>
      <Switch>
        <Route path="/self_help" exact={true}>
          <SelfHelp />
        </Route>
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
      </Switch>
    </Router>
  )
}

export default App
