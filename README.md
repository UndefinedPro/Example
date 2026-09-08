# CH09 运动控制：cmd_vel 如何变成轮子转动

一个**交互式讲解视频**网页（16:9，paper-press 亮色印刷主题）：像看视频一样逐步播放，每一步配一段口播讲解 + 动画演示。本片 16 个小节、65 步，约 14 分钟，面向零基础观众讲解 ROS2 小车的运动控制全链路。

## 快速观看（视频演示）

> 前置要求：安装 [Node.js](https://nodejs.org/)（18 以上）。

```bat
cd presentation
npm install
npm run dev
```

启动后浏览器打开 **http://localhost:5189**（端口在 `vite.config.ts` 中配置）。

**播放操作：**

| 操作 | 效果 |
|---|---|
| `空格` / `→` | 下一步（一拍 = 一段口播 + 一屏动画） |
| `←` | 上一步 |
| 数字键 `1`-`9` | 跳到对应小节 |
| 地址加 `?auto=1` 后按空格 | **自动连播**：逐帧自动推进并播放配音 |

配音已预先生成在 `presentation/public/audio/` 下，自动连播模式即是一支带解说的完整视频，直接用录屏软件录制即可导出成片。

## 项目结构

```
├── article.md            # 本章原文（画面细节的信息源）
├── script.md             # 口播稿（一拍 = 一条分隔线内的话）
├── outline.md            # 开发计划（小节切分 + 每步画面 + 信息池）
├── screenshots/          # 全片逐帧渲染图（65 帧，按小节分目录）
└── presentation/         # Vite + React + TS 工程
    ├── src/chapters/     # 每小节一个文件夹：<Name>.tsx + .css + narrations.ts
    ├── src/registry/     # 小节注册表（顺序 = 播放顺序）
    ├── public/audio/     # 口播配音（edge-tts 合成，已预生成）
    └── scripts/          # 口播提取 / 音频合成 / 逐帧渲染脚本
```

## 常用命令

```bat
cd presentation
npm run dev                   # 启动开发服务（localhost:5189）
npm run build                 # 构建生产版本（dist/）
npm run extract-narrations    # 从 narrations.ts 提取口播段
npm run synthesize-audio      # 合成配音（需配置 TTS provider）
node scripts/render-frames.mjs --manifest steps.json --out ../screenshots --key presentation-cursor-pp-09 --url http://localhost:5189/
                              # 逐帧渲染全片 PNG（需先启动 dev server）
```

## 内容一览

`/cmd_vel` 速度指令如何一步步变成轮子转动：Twist 消息解析 → 差速运动学解算（kLy/kTrackWidth/kWheelDiameter）→ 20ms 控制周期的运动任务 → 编码器闭环（kAlpha 滤波、PID 参数 kKp/kKi/kKd、死区补偿）→ PWM 输出；以及 `/odom` 里程计的逆推与 TF 发布。技术细节均取自固件真实代码（`leap_low_v1/components/motion_controller`）。
