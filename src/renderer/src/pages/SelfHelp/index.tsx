import { useSelector } from 'react-redux'
import styles from './index.module.scss'
import HostModule from './HostModule'

const SelfHelp = () => {
  const netInfo = useSelector((store: any) => store.netInfo)

  return (
    <div className={`${styles.container} main`}>
      <HostModule className="w-[240px]" />
    </div>
  )
}

export default SelfHelp
