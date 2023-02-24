import { BaseList } from '@renderer/components'
import { IconGithub } from '@arco-design/web-react/icon'
import styles from './index.module.scss'

const AboutUS = () => {
  return (
    <div className={`${styles.container} main`}>
      <h1 className="my-5">
        NetHelper
        <a href="https://github.com/GrinZero/sztunethelper" target="_blank" rel="noreferrer">
          <IconGithub className="ml-2" />
        </a>
      </h1>
      <h2 className="text-xl pb-4">背景</h2>
      <p>
        这是一款网络助手类型的软件，暂时只服务于深圳技术大学北区宿舍，由于和客服相关的功能还没有对接联通，暂时不能用哦～
      </p>
      <h2 className="text-xl py-4">功能</h2>
      <BaseList>
        <span className="p-3">
          设备管理（基本功能）：设备下线、别名标记、本机标记以及更多设备信息
        </span>
        <span className="p-3">
          网络信息（基本功能）：简易的网络信息，包括IP、网关、DNS、WIFI名称等，在主页方便小白截图
        </span>
        <span className="p-3">
          自助服务（自助排障）：需要主动触发的网络问题检测项，生成报告后可以发送给工作人员方便排障
        </span>
        <span className="p-3 opacity-30">
          在线排障（消息图标）：我们已经完成了实时通讯的工单系统，可以在这里查看工单的状态，以及回复工单。（暂未启用）
        </span>
        <span className="p-3">
          Super设置（设置图标）：我们设计了魔法Hosts以及一些非常有趣的功能，可以在这里开启哦～
        </span>
        <span className="p-3">
          账户管理（用户图标）：在这里，登录什么的都是基本操作，重点是可以完美切换账户而不再需要麻烦地手动清理cookie
        </span>
      </BaseList>
      <h2 className="text-xl py-4">开发者留言</h2>
      <p>
        目前功能还不是很完善，后续会慢慢完善的～如果你觉得这款软件帮到你了，给我点个star如何？
        <a href="https://github.com/GrinZero/sztunethelper" target="_blank" rel="noreferrer">
          <IconGithub className="ml-2" />
        </a>
      </p>
      <p>
        如果你有什么想反馈的，欢迎在
        <a
          className="text-[var(--lives-blue)]"
          href="https://github.com/GrinZero/sztunethelper/issues"
          target="_blank"
          rel="noreferrer"
        >
          issue
        </a>
        中提出，我会尽快处理的～
      </p>
    </div>
  )
}

export default AboutUS
