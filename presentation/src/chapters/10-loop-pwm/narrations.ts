import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "第三件，外环。按当前控制模式算「车体该跑多快」。速度模式下，外环就是命令本身，直接透传。",
  "第四件，内环。每个轮子一个 PID，目标 RPM 对实测 RPM，算出该给多少 PWM。",
  "发出去之前还有一脚 ApplyDeadband，死区补偿。电机从静止起步要个最小 PWM，这里是 150。PID 出力太小轮子根本不动，所以主动补这脚油门，小指令也能立刻起步。",
];
