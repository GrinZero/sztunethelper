//https://blog.51cto.com/aiyc/5153900
export const mailOptionsStore = {
  'mail.aliyun.com': {
    smtp: {
      host: 'smtp.aliyun.com',
      sslPort: 465,
      port: 25
    },
    imap: {
      host: 'imap.aliyun.com',
      sslPort: 993,
      port: 143
    }
  },
  'qq.com': {
    smtp: {
      host: 'smtp.qq.com',
      sslPort: 465,
      port: 25
    },
    imap: {
      host: 'imap.qq.com',
      sslPort: 993,
      port: 143
    }
  },
  '163.com': {
    smtp: {
      host: 'smtp.163.com',
      port: 25
    },
    imap: {
      host: 'imap.163.com',
      port: 143
    }
  },
  '126.com': {
    smtp: {
      host: 'smtp.126.com',
      port: 25
    },
    imap: {
      host: 'imap.126.com',
      port: 143
    }
  },
  'gmail.com': {
    smtp: {
      host: 'smtp.gmail.com',
      sslPort: 587
    },
    imap: {
      host: 'imap.gmail.com',
      sslPort: 993
    }
  },
  'foxmail.com': {
    smtp: {
      host: 'smtp.foxmail.com',
      port: 25
    },
    imap: {
      host: 'imap.foxmail.com',
      port: 143
    }
  }
}
