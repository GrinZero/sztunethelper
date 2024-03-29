import { useCallback, useMemo, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Message } from "@arco-design/web-react";

import { AccountInStore } from "../Login/AccountStore";
import styles from "./index.module.scss";
import PlatformList from "./PlatformList";
import NetInfoCard from "./NetInfoCard";
import DutyCard from "./DutyCard";

import { useNetSpeed } from "@renderer/hooks";
import {
  login,
  getNetInfo,
  fetchPlatformList,
  offlinePlatform,
  connect,
} from "@renderer/api";
import type { Platform } from "@renderer/api";
import { Account } from "@renderer/types";
import { setNetInfo } from "@renderer/store";
import connectSrc from "../../assets/mp4/connecting.mp4";
import loginSrc from "../../assets/mp4/logging.mp4";
import offlineSrc from "../../assets/image/no-net.svg";

const offlinePlatfromLine = async (link: string, account: Account) => {
  const res = await login(account);
  await offlinePlatform(link, res.data?.cookies ?? "");
};

const Main = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  const [platformList, setPlatformList] = useState<Platform[] | null>([]);

  const [status, _setStatus] = useState("offline");
  const setStatus = (status) => {
    window.storage.set("netStatus", status);
    _setStatus(status);
  };
  const netInfo = useSelector((store: any) => store.netInfo);
  const [ping, jit] = useNetSpeed(status === "success");

  const init = async (type?: "normal" | "refresh") => {
    const username = await window.storage.get<string>("username");
    const password = await window.storage.get<string>("password");
    console.info("login:username", username);
    if (!username || !password) {
      setStatus("offline");
      history.push("/login");
      return;
    }
    const getCookie = async () => {
      console.info("init#getCookie:start");
      const cookie = sessionStorage.getItem("cookie");
      if (cookie && type !== "refresh") {
        setStatus("connect");
        return;
      }
      const res = await login({ username, password });
      if (res.code === 200) {
        sessionStorage.setItem("cookie", (res.data as any).cookies);
        setStatus("connect");
      } else {
        setStatus("offline");
      }

      console.info("init#getCookie:end");
    };
    const getNetInfomation = async () => {
      try {
        const res = await getNetInfo();
        if (res.code === 200) {
          dispatch(setNetInfo(res.data));
          return res.data;
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    };
    const getPlatformList = async (
      cookie: string | null,
      currentIP: string | null | undefined
    ) => {
      if (cookie === null) {
        return;
      }
      setPlatformList(null);
      const res = await fetchPlatformList(cookie);
      setPlatformList(res.data.list);

      const currentPlatform = res.data.list.find(
        (item) => item.ip === currentIP
      );
      if (!currentPlatform) {
        return;
      }
      await window.storage.set("currentPlatform", currentPlatform);
    };
    const connectToNet = async (
      cookie: string,
      currentIP: string | null | undefined
    ) => {
      const currentPlatform = await window.storage.get<Platform | null>(
        "currentPlatform"
      );
      if (currentPlatform && currentPlatform.user !== username) {
        // 必须使用原本的cookie
        const accountStore =
          (await window.storage.get<AccountInStore[]>("accountStore")) ?? [];
        await offlinePlatfromLine(currentPlatform.link, {
          username: currentPlatform.user,
          password:
            accountStore.find(
              (item: AccountInStore) => item.username === currentPlatform.user
            )?.password ?? "",
        });
      }

      try {
        const connectResult = await connect({ username, password });
        if (connectResult.code === 200) {
          setStatus("success");
          if (connectResult.msg === "login success") {
            await getPlatformList(cookie, currentIP);
          }
        } else {
          setStatus("offline");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const confirmRefresh = () => {
      Modal.confirm({
        title: "联网提示",
        content: "别急！关掉系统弹出的上网认证窗口，点击确认即可！",
        onOk: () => {
          history.push("/index?refresh");
        },
        hideCancel: true,
      });
      setStatus("offline");
    };

    try {
      const netInfomation = await getNetInfomation();
      if (netInfomation?.wifiName?.type === "fail") {
        throw new Error("未连接指定WIFI");
      }
      if (netInfomation?.dhcp.type === "fail") {
        throw new Error("DHCP");
      }

      if (netInfomation?.proxy?.value) {
        Modal.confirm({
          title: "检测到您开启了代理",
          content: (
            <div>
              <p>如您当前打开网页提示【代理服务器可能有问题】</p>
              <p className="mt-3">
                该问题的原因是您的代理服务器不正常，请关闭代理后重试
              </p>
            </div>
          ),
          hideCancel: true,
        });
      }

      await getCookie();
      const cookie = sessionStorage.getItem("cookie");
      await getPlatformList(cookie, netInfomation?.ip?.value);
      connectToNet(cookie as string, netInfomation?.ip?.value);
    } catch (error: any) {
      console.error("error:init", error);
      if (error.message === "DHCP") {
        Modal.confirm({
          title: "检测到您开启了DHCP",
          content: (
            <div>
              <p>校园网服务需要开启DHCP实现自动IP地址分配</p>
              <p className="mt-3">请在WIFI设置中关闭DHCP后点击确认重试</p>
            </div>
          ),
          onOk: () => {
            history.push("/index?refresh");
          },
          hideCancel: true,
        });
        setStatus("offline");
        return;
      }

      if (error.message === "未连接指定WIFI") {
        Message.error({
          content: "未连接指定WIFI",
        });
        setStatus("offline");
        return;
      }
      if (
        error?.code === 502 &&
        error?.data?.code === -1 &&
        error?.data?.cookies === null
      ) {
        Message.error({
          content: "登录失败，请检查账号密码是否正确",
        });
        setStatus("offline");
        history.push("/login");
        return;
      }
      if (
        error?.code === -1 &&
        error?.data?.message?.includes?.("connect ENETUNREACH 47.98.217.40")
      ) {
        confirmRefresh();
        return;
      }

      if (error?.code === 502 && error?.data?.code === -10056) {
        confirmRefresh();
        return;
      }
    }
  };

  const handleMainCardClick = useCallback(() => {
    if (status === "offline") {
      setStatus("logging");
      init();
    }
  }, [status]);
  const handleOffline = (platform: Platform) => {
    Modal.confirm({
      title: "确认下线",
      content: `确认下线${platform.ip}吗？`,
      onOk: async () => {
        offlinePlatform(platform.link, sessionStorage.getItem("cookie") ?? "");
        if (platform.ip === netInfo.ip.value) {
          setStatus("offline");
        }
        setPlatformList(
          platformList?.map((item) => {
            if (item.link === platform.link) {
              return {
                ...item,
                endTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
              };
            }
            return item;
          }) ?? null
        );
      },
    });
  };
  const handleNameChange = async ({
    val,
    id,
    ip,
  }: {
    val: string;
    id: string;
    ip: string;
  }) => {
    const nameStore =
      (await window.storage.get<Record<string, string>>("nameStore")) ?? {};
    setPlatformList(
      platformList?.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: val,
          };
        }
        return item;
      }) ?? null
    );
    nameStore[id] = val;
    nameStore[ip] = val;
    await window.storage.set("nameStore", nameStore);
  };

  const mainCard = useMemo(() => {
    const content = (() => {
      switch (status) {
        case "offline":
          return <img src={offlineSrc} width={270} />;
        case "logging":
          return (
            <video
              autoPlay
              loop
              src={loginSrc}
              width={360}
              className="mix-blend-multiply"
              preload="auto"
            ></video>
          );
        case "connect":
          return (
            <video
              autoPlay
              loop
              src={connectSrc}
              width={360}
              className="mix-blend-color-burn"
              preload="auto"
            ></video>
          );
        default:
          return (
            <div className="text-3xl">
              <div>延迟：{ping}ms</div>
              <div>抖动：{jit}ms</div>
            </div>
          );
      }
    })();

    return (
      <div
        className={`w-full min-h-[380px] h-full mt-6 rounded-[15px] ${
          styles["main__background-card"]
        } ${styles[`main__background-card__${status}`]}`}
        onClick={handleMainCardClick}
      >
        <div
          className={`w-full h-full flex items-center justify-center text-[45px]`}
        >
          {content}
        </div>
      </div>
    );
  }, [status, handleMainCardClick, ping, jit]);

  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (location.search === "?refresh") {
      init("refresh");
    }
  }, [location]);

  return (
    <div className={`main`}>
      <div className="flex flex-grow-0 flex-shrink-0 w-full h-full">
        <div className="flex flex-col h-full max-w-[220px]">
          <NetInfoCard className="min-w-[220px]" netInfo={netInfo} />
          <DutyCard />
        </div>
        <div className="flex flex-col ml-6 w-full h-full">
          <PlatformList
            platformList={platformList}
            currentIP={netInfo.ip.value}
            onOffline={handleOffline}
            onNameChange={handleNameChange}
            onFlush={init}
          />
          {mainCard}
        </div>
      </div>
    </div>
  );
};

export default Main;
