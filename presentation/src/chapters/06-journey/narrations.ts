import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "公式有了。我们追一条指令的完整旅程，看看它在固件里要经过几站，每一站都干嘛。",
  "路线图在这：电脑发 /cmd_vel，micro-ROS 任务收下，丢进队列 q_motion_cmd。motion_task 每 20 毫秒取一次，调 robot.Drive。",
  "再往下进 motion_controller：运动学解算、PID、PWM、电机。四站走完，轮子开转。",
];
