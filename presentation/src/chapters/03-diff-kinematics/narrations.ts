import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "那底盘怎么把油门和方向盘，翻译成两个轮子的转速？这台车俩轮子固定在左右两侧，不会像汽车前轮那样拐弯，转向全靠两边转速差。这套数学就叫差速运动学。",
  "四种情况看一遍就懂：左轮慢，往右拐。左轮快，往左拐。两轮同速，直行。左右反转，原地转。",
  "源码里就是个函数，CalculateKinematics，核心就两行。",
  "左轮等于 linear_x 减 angular_z 乘 75，右轮等于 linear_x 加 angular_z 乘 75，再整体乘一个 kMmsToRpm。",
];
