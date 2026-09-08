import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "该动手了。先说安全：小车架上支架让轮子悬空，或者去空旷地面，micro-ROS agent 连好。",
  "先验里程计。ros2 topic echo /odom，只看 position 那栏。手推小车，看 x、y 跟着变。",
  "再上遥控。ros2 run teleop_twist_keyboard，按 i 前进，j、l 转弯。此刻你就是在亲手发 /cmd_vel。",
  "最后画圆。发布固定指令：前进 0.1，旋转 0.5。一直往前又一直拐，轨迹就是个圆。",
  "留个思考题：圆的半径多大？r 等于 v 除以 ω，0.1 除以 0.5，0.2 米。拿实测对一下。",
  "为啥说这个实验值钱：一条指令把全章串了一遍。你发 Twist，运动学分速，PID 执行，odom 记账。",
];
