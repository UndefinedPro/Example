import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "第二件，收 PID 参数。外部能动态调速环、位置环参数，第 17 章调参会用到。",
  "第三件，急停检查。g_emergency_stop 一旦为真，直接 robot.Stop。急停排在干活前面，安全永远比运动优先，真出事慢一步都不行。",
  "第四件，执行控制循环。robot.Update，把 dt 和 IMU 的偏航角一起喂给控制器。",
  "第五件，上报遥测。速度、里程、四元数打包进 q_motion_state，由 micro-ROS 任务发布成 /odom。收指令和发遥测各走各的队列，互不挡道。",
];
