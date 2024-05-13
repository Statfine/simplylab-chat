"use client"; // This is a client component
import { useRef, useEffect } from "react";
import VePlayer, { Events } from "@byteplus/veplayer";
import "@byteplus/veplayer/index.min.css";
import Script from "next/script";

/**
 * 外挂字幕   文档https://www.volcengine.com/docs/4/68693#%E5%A4%96%E6%8C%82%E5%AD%97%E5%B9%95
 * 清晰度降级 文档中有提，单无实际案例 https://www.volcengine.com/docs/4/127897
 */

export default function Video() {
  /** 播放器实例 */
  const playerSdk = useRef<any>();

  useEffect(() => {
    // initVideo();
  }, []);

  // const initVideo = () => {
  //   const config: any = {
  //     id: "video_pc",
  //     lang: "zh",
  //     vodLogOpts: {
  //       vtype: "MP4",
  //       tag: "普通视频",
  //       line_app_id: 348293,
  //       line_user_id: "veplayer_web_demo",
  //     },
  //     streamType: "hls",
  //     url: "https://v-mps.crazymaplestudios.com/vod-112094/9063f84dcaa671eebffd86c6360c0102/03a2f860e6cc46b3a92bd5f1965fdad6-f04034f74b105a1f2ae2f5b6b22a05f2-ld.m3u8",
  //     width: 600,
  //     height: 400,
  //     autoplay: true,
  //     loop: true,
  //     fluid: true,
  //   };

  //   playerSdk.current = new VePlayer(config);
  // };
  const initVideo = () => {
    const config: any = {
      id: `video_pc`,
      pip: false,
      lang: "en",
      autoplay: true,
      ignores: ["keyboard"],
      vodLogOpts: {
        tag: "chap_play_scene", // 业务标签，用于区分业务中不同的场景，方便后续进行多维度分析
        line_app_id: 547760, // 【必选】该值为 int 类型，接入视频点播的SDK应用id，可以从点播控制台-点播SDK-应用管理获取
      },
      hls: {
        retryCount: 5, // 重试 3 次，默认值
        retryDelay: 1000, // 每次重试间隔 1 秒，默认值
        loadTimeout: 15000, // 请求超时时间为 10 秒，默认值
      },
      enableHlsMSE: true,
      url: "https://dev-v-mps.crazymaplestudios.com/a041a995fdf071eebfb01426d1810102/h264-ld.m3u8",
      // 清晰度降级
      DefinitionDemotePlugin: {
        oftenWaitingCount: 1,
        oftenWaitingTime: 100,
        longWaitingTime: 100,
        // isNeedAutoDemote: true,
        demotePriority: ["uhd", "hd", "ld"],
      },
    };

    playerSdk.current = new VePlayer(config);

    /**播放事件 */
    playerSdk.current!.on(Events.LOAD_START, (e: any) => {
      console.log("=====>Events.LOAD_START");
    });
    playerSdk.current!.on(Events.CANPLAY, (e: any) => {
      console.log("=====>Events.CANPLAY");
    });
    /**视频起播数据加载完成 */
    playerSdk.current!.on(Events.LOADED_DATA, (e: any) => {
      console.log("=====>Events.LOADED_DATA");
    });
    /**播放事件 */
    playerSdk.current!.on(Events.PAUSE, (e: any) => {
      console.log("=====>Events.PAUSE");
    });
    playerSdk.current!.on(Events.PLAY, (e: any) => {
      console.log("=====>Events.PLAY");
    });
  };

  const handleNext = () => {
    playerSdk.current?.player?.pause?.();
    playerSdk
      .current!.playNext({
        startTime: 0, // 从 0 开始播放
        streamType: "hls",
        autoplay: true,
        url: "https://v-mps.crazymaplestudios.com/vod-112094/d4d420d8eb044ffbb7aa446ef90e95ee/1174126cea2245bea2451899fc634512-5eb8139482a0db85f7e943b599f4ecc7-ld.m3u8",
      })
      .then(() => {
        playerSdk.current?.player?.play?.();
      });
  };

  return (
    <div>
      <Script
        src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
        onLoad={() => {
          //@ts-ignore
          new window.VConsole();
        }}
      ></Script>
      <div
        id="video_pc"
        style={{
          width: 360,
          height: 632,
          background: "#000",
          position: "relative",
          margin: "0 auto",
        }}
      />
      <div onClick={initVideo} style={{ color: "#000" }}>
        init
      </div>
      <div onClick={handleNext} style={{ color: "#000" }}>
        next
      </div>
    </div>
  );
}
