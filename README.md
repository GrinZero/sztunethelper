# sztunethelper

这是一款网络助手类型的软件，暂时只服务于深圳技术大学北区宿舍网络。

## Getting Started

点击[这里](https://github.com/grinzero/sztunethelper/releases/)前往下载

如果你是 macOS 用户，需要选择 ARM 版本或 Intel 版本，并且由于 Apple 的限制（我没有充钱），需要在系统偏好设置中允许来自任何来源的应用程序。
这行命令可以帮助你关闭这个限制（command+空格，搜索终端，然后回车运行）

```bash
sudo spctl --master-disable // 关闭限制，安装前运行一次即可

sudo xattr -r -d com.apple.quarantine /Applications/sztunethelper.app // 每次安装后运行一次
```

由于网络助手的特殊性，当网络崩溃的时候，你并不能通过 PC 访问网络，所以我准备了一个 web 网站：
https://grinzero.github.io/sztunethelper/
