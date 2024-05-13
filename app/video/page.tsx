"use client"; // This is a client component
import { useRef, useEffect } from "react";
import VePlayer from "@byteplus/veplayer";
import "@byteplus/veplayer/index.min.css";

/**
 * 外挂字幕   文档https://www.volcengine.com/docs/4/68693#%E5%A4%96%E6%8C%82%E5%AD%97%E5%B9%95
 * 清晰度降级 文档中有提，单无实际案例 https://www.volcengine.com/docs/4/127897
 */

export default function Video() {
  /** 播放器实例 */
  const playerSdk = useRef<any>();

  useEffect(() => {
    initVideo();
  }, []);

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
      plugins: [(VePlayer as any).Subtitle],
      Subtitle: {
        isDefaultOpen: true,
        list: [
          {
            src: "https://voddemo-play.volcvod.com/0c16c5f8b1f24604b0cb44576e1bddbe?auth_key=1760759306-78b47ad74e6f4f17a2854f46fa0b9984-0-053c7576ce1414c14644ca097f81f2ac&mime_type=text_plain",
            text: "English",
            default: true,
          },
          {
            src: "https://voddemo-play.volcvod.com/e87a83f58eb94d20bac00eb0a6f1961e?auth_key=1760759306-44d26d5ea7cf40d5a444b4131f11be21-0-74813847533f23d059943fafb97571f5&mime_type=text_plain",
            text: "Chinese",
            default: false,
          },
        ],
      },
      hls: {
        retryCount: 5, // 重试 3 次，默认值
        retryDelay: 1000, // 每次重试间隔 1 秒，默认值
        loadTimeout: 15000, // 请求超时时间为 10 秒，默认值
      },
      url: "//voddemo-play.volcvod.com/e826c993a2444058915fb494c4fcdabb?a=0&auth_key=1751882567-8882fc603afb49edbb2665e62c95c69b-0-32390643c8637e4d3e46e87a684d5a4b&br=660&bt=660&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=0&l=20220708180015010204028132080F0005&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApZzg6ZzkzZTxoN2QzNGY3NWdfZy9gMHFrYTBgLS1kYy9zc2IwNS4wM2NhYjZhMi4wNTY6Yw%3D%3D&vl=&vr=",
      // 清晰度降级
      DefinitionDemotePlugin: {
        oftenWaitingCount: 1,
        oftenWaitingTime: 100,
        longWaitingTime: 100,
        // isNeedAutoDemote: true,
        demotePriority: ['uhd', 'hd', 'ld']
      },
      playList: [
        {
          url: "//voddemo-play.volcvod.com/e826c993a2444058915fb494c4fcdabb?a=0&auth_key=1751882567-8882fc603afb49edbb2665e62c95c69b-0-32390643c8637e4d3e46e87a684d5a4b&br=660&bt=660&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=0&l=20220708180015010204028132080F0005&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApZzg6ZzkzZTxoN2QzNGY3NWdfZy9gMHFrYTBgLS1kYy9zc2IwNS4wM2NhYjZhMi4wNTY6Yw%3D%3D&vl=&vr=",
          definition: 'uhd', // 清晰度
        },
        {
          url: "//voddemo-play.volcvod.com/c02067c4c6dd48069bf1ad10f29d9624?a=0&auth_key=1751882605-59de01aa4b9e4e248904483358c07d46-0-abbe728b89a8f326dcab7dcb347f6cff&br=460&bt=460&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=2&er=0&l=2022070818005301020810207720108FFC&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApZWk2ZDY3OWQ0N2k7Nmk0Z2dfZy9gMHFrYTBgLS1kYy9zc2BjYzYxMjY1YTUtYzZhMl46Yw%3D%3D&vl=&vr=",
          definition: 'hd', // 清晰度
        },
        {
          url: "//voddemo-play.volcvod.com/181c21bebdde4fb3998aed8d2440ca9d?a=0&auth_key=1751882631-a0bf23d4f8bf4b54927566d94ee85ede-0-fff818e3041b21ee9d2e4daec56e916b&br=299&bt=299&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=1&er=0&l=2022070818011901020810207720109B42&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApaTtpODxnaWRkN2Q4aTc1O2dfZy9gMHFrYTBgLS1kYy9zc2A1YmJeMS8vYi5gLy9eYi46Yw%3D%3D&vl=&vr=",
          definition: 'ld',
          definitionTextKey: "LD",
        },
      ],
      // // url: "https://dev-v-mps.crazymaplestudios.com/vod-112d8b/c7af9890a84f71edbfd686c6360c0102/2d71e703ee8b42ee859fe2269dcd0a20-c144b54dbcdf265b4670f64b62f842f4-ld.m3u8",
      // playList: [
      //   {
      //     url: "//voddemo-play.volcvod.com/181c21bebdde4fb3998aed8d2440ca9d?a=0&auth_key=1751882631-a0bf23d4f8bf4b54927566d94ee85ede-0-fff818e3041b21ee9d2e4daec56e916b&br=299&bt=299&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=1&er=0&l=2022070818011901020810207720109B42&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApaTtpODxnaWRkN2Q4aTc1O2dfZy9gMHFrYTBgLS1kYy9zc2A1YmJeMS8vYi5gLy9eYi46Yw%3D%3D&vl=&vr=",
      //     streamType: "mp4",
      //     definition: "标清",
      //     definitionTextKey: "LD",
      //   },
      //   {
      //     url: "//voddemo-play.volcvod.com/c02067c4c6dd48069bf1ad10f29d9624?a=0&auth_key=1751882605-59de01aa4b9e4e248904483358c07d46-0-abbe728b89a8f326dcab7dcb347f6cff&br=460&bt=460&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=2&er=0&l=2022070818005301020810207720108FFC&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApZWk2ZDY3OWQ0N2k7Nmk0Z2dfZy9gMHFrYTBgLS1kYy9zc2BjYzYxMjY1YTUtYzZhMl46Yw%3D%3D&vl=&vr=",
      //     streamType: "mp4",
      //     definition: "高清",
      //     definitionTextKey: "HD",
      //   },
      //   {
      //     url: "//voddemo-play.volcvod.com/e826c993a2444058915fb494c4fcdabb?a=0&auth_key=1751882567-8882fc603afb49edbb2665e62c95c69b-0-32390643c8637e4d3e46e87a684d5a4b&br=660&bt=660&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=0&l=20220708180015010204028132080F0005&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApZzg6ZzkzZTxoN2QzNGY3NWdfZy9gMHFrYTBgLS1kYy9zc2IwNS4wM2NhYjZhMi4wNTY6Yw%3D%3D&vl=&vr=",
      //     streamType: "mp4",
      //     definition: "超清",
      //     definitionTextKey: "UHD",
      //   },
      // ],
    };

    playerSdk.current = new VePlayer(config);
  };

  const handelChangeDefinition = () => {
    // 假设想要切换到低清晰度的视频流
    playerSdk.current.player.changeDefinition({
      definition: "hd", // 对应 playList 中配置的 definition 值
      url: "//voddemo-play.volcvod.com/c02067c4c6dd48069bf1ad10f29d9624?a=0&auth_key=1751882605-59de01aa4b9e4e248904483358c07d46-0-abbe728b89a8f326dcab7dcb347f6cff&br=460&bt=460&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=2&er=0&l=2022070818005301020810207720108FFC&lr=&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amg6c2o0aTg6ZTQzNGRnM0ApZWk2ZDY3OWQ0N2k7Nmk0Z2dfZy9gMHFrYTBgLS1kYy9zc2BjYzYxMjY1YTUtYzZhMl46Yw%3D%3D&vl=&vr=", // 对应低清晰度的视频流地址
    });
  };

  return (
    <div>
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
      <div onClick={handelChangeDefinition} style={{ color: '#000'}}>高清</div>
      <div onClick={initVideo} style={{ color: '#000'}}>init</div>
    </div>
  );
}
