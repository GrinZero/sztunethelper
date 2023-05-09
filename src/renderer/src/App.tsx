import './tailwind.css'
import 'magic-design-react/dist/index.esm.css'
import './assets/iconfont/iconfont'
import '@arco-design/web-react/dist/css/arco.css'

import './global.scss'
import './App.css'

import './extension'

// import { VideoBg } from './components/VideoBg'
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { TopBar } from './pages'
import { useEffect, lazy, Suspense } from 'react'
import store, { initAccount } from './store'
import { useConfig } from './hooks'
import { useBaseData } from './api'
import { BaseLoading } from './components'

import { history } from '@renderer/utils'

const Lazy = ({ children: Children }: { children: any }) => {
  return (
    <Suspense
      fallback={
        <div className="flex-row flex w-full h-full items-center justify-center">
          <BaseLoading size="large" />
        </div>
      }
    >
      <Children />
    </Suspense>
  )
}

const App = () => {
  useEffect(() => {
    store.dispatch(initAccount())
  }, [])
  useConfig()
  useBaseData()

  // const { platform } = window.navigator
  return (
    <Router history={history!}>
      <Redirect to="/index" path="/" exact={true} />
      <Route path="/">
        <TopBar type="mac" />
        <Lazy>{lazy(() => import('./pages/Main'))}</Lazy>
        <Lazy>{lazy(() => import('./pages/SelfHelp'))}</Lazy>
        {/* {platform.includes('Mac') || platform.includes('mac') ? null : <VideoBg />} */}
      </Route>
      <Switch>
        <Route path="/login" exact={true}>
          <Lazy>{lazy(() => import('./pages/Login'))}</Lazy>
        </Route>
        <Route path="/setting" exact={true}>
          <Lazy>{lazy(() => import('./pages/Setting'))}</Lazy>
        </Route>
        <Route path="/about_us" exact={true}>
          <Lazy>{lazy(() => import('./pages/AboutUS'))}</Lazy>
        </Route>
        <Route path="/message" exact={true}>
          <Lazy>{lazy(() => import('./pages/MessagePage'))}</Lazy>
        </Route>
        <Route path="/mail_config" exact={true}>
          <Lazy>{lazy(() => import('./pages/MailConfig'))}</Lazy>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
