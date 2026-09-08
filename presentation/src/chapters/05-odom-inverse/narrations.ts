import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "这公式还能倒着用。GetVelocity，从左右轮的实测转速，反推车体的 linear.x 和 angular.z。",
  "这就是里程计的来源。轮子转了多少圈、多快，一路攒起来，就是 /odom 话题里小车的位置和朝向。",
  "同一个公式，正算是控制，反算是感知。一份数学干两份活，代码少写一半，两头还天然一致。",
];
