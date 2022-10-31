import { Switch } from '@arco-design/web-react'
import styles from './index.module.scss'

const Setting = () => {
  return (
    <div className={`main`}>
      <label className={`${styles.row}`}>
        <div className={`${styles.label}`}>自动更新</div>
        <Switch />
      </label>
      <label className={`${styles.row}`}>
        <div className={`${styles.label}`}>永不断网</div>
        <Switch />
      </label>
      <label className={`${styles.row}`}>
        <div className={`${styles.label}`}>自动主题</div>
        <Switch />
      </label>
      <label className={`${styles.row}`}>
        <div className={`${styles.label}`}>开机自启动</div>
        <Switch />
      </label>
      {/* <label className={`${styles.row}`}>
        <div className={`${styles.label}`}>都用不了，开发中！</div>
      </label> */}
    </div>
  )
}

export default Setting
