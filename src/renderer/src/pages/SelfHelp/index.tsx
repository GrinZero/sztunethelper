import { useSelector } from 'react-redux'

import styles from './index.module.scss'

const SelfHelp = () => {
  const netInfo = useSelector((store: any) => store.netInfo)

  console.log(netInfo.speed)

  return (
    <div className={`${styles.container} main`}>
      <div>10.1.20.220</div>
    </div>
  )
}

export default SelfHelp
