import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "P 是比例，误差越大出力越大，差多少补多少。",
  "I 是积分，误差攒起来算总账，专治长期差一点点的稳态误差。这台车 ki 给到 6，挺大，说明电机低速阻力明显，主要靠 I 硬拉起来。",
  "D 是微分，看误差变化率，抑制超调。这台车没用到，kD 是 0。",
  "还有个 pid_controller 组件，支持两种模式：增量式和位置式。速度环用增量式，输出 PWM 增量，天然平滑，不会猛跳。位置环用位置式。",
];
