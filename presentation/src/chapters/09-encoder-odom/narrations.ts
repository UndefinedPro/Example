import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "进 motion_controller 的 Update 看一眼。每轮四件事，源码注释写得明明白白。",
  "第一件，读编码器。两次更新之间的脉冲差，换成每秒脉冲数，再换算 RPM。轮子实际转多快，全靠它汇报。",
  "这里藏着个细节：sign 等于 1 和负 1。右轮电机装反了，读数得取负。软件里取个负号，一行搞定，省得拆车重装。",
  "原始转速带毛刺，先过一阶低通滤波抹平，系数 kAlpha 0.35。实测值稳了，PID 才不会追着噪声乱出力。",
  "第二件，里程计更新。拿滤波后的轮速，积分出 x、y、yaw，顺便把总里程 total_distance 也攒着。",
];
