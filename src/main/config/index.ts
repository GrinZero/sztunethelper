export interface CheckNetTask {
  id: number | string
  title: string
  args: string[]
  command: string
}

export const CheckNetTaskList: CheckNetTask[] = [
  { id: 1, title: '检测内网网关', command: 'ping', args: ['内网网关'] },
  { id: 2, title: '检测校园网网络服务器', command: 'ping', args: ['10.99.99.99'] },
  { id: 3, title: '检测校园网宿舍认证服务器', command: 'ping', args: ['47.98.217.39'] },
  { id: 4, title: '检测本地TCP/IP协议栈', command: 'ping', args: ['127.0.0.1'] },
  { id: 5, title: '检测本地DNS服务器', command: 'ping', args: ['localhost'] },
  { id: 6, title: '检测公网DNS服务器', command: 'ping', args: ['114.114.114.114'] },
  { id: 7, title: '获取网络报告', command: 'ifconfig', args: [] },
  { id: 8, title: '获取网络连接状态', command: 'netstat', args: ['-a'] },
  { id: 9, title: '获取ARP缓存表', command: 'arp', args: ['-a'] },
  { id: 10, title: '校园网络认证网路探测', command: 'tracert', args: ['47.98.217.39'] }
]