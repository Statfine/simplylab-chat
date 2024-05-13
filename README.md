## Getting Started

基于create-react-app nextjs；
1. 运行npm i 安装依赖；
2. 安装完毕后运行npm run dev 
3. 页网打开http://localhost:3000查看效果(如果端口3000被暂用，查看控制台变更后的端口)；


First, run the development server:

```bash
npm i

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 项目布局

```
.
│── app
│   ├── components                       // 组件
|   |   ├── AppKeyDialog                    // 设置key弹框 material-ui
|   |   ├── MessageEmpty                    // 空列表显示
|   |   ├── MessageForm                     // 对话框表单
│   │   └── MessageList                     // 对话列表
│   ├── hooks                            // 自定义hooks
│   │   └── useMessages.ts                  // 状态，数据，方法 先做抽离后续可以放置createContext中或者redux&saga，无需组件传入
│   ├── services                         // 请求
|   |   ├── checkAppKey.ts                  // 验证appkey接口
│   │   └── sendMessage.js                  // openrouter对话接口
│   └── page                             // 单页页面
├── public                               // 静态资源
.

```
