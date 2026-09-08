import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "卡住了别慌，三种情况对号入座。",
  "第一种，发 cmd_vel 没反应。查 agent 连没连上，第 6 章讲过。再看 Web 配置网页，切没切到 micro-ROS 模式。",
  "第二种，小车走不直。左右轮 PID 特性有差异，或者死区不对称。微调 kDeadband，或者用 PID 指令在线调试。",
  "第三种，odom 漂移。轮式里程计天生会漂，打滑没得治。所以后面 Nav2 还要融合 IMU 和激光做定位，第 15 章见。",
];
