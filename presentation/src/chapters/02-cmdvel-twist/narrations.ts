import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "先看这条指令长啥样。消息类型叫 Twist，一个消息里塞了六个数。我们这台小车只用了俩：linear.x 管前进，angular.z 管转弯。",
  "linear.x 是前进速度，单位米每秒，正数向前。angular.z 是绕竖直轴转的速度，弧度每秒，正数逆时针，也就是左转。",
  "最好懂的比喻是开车：linear.x 就是油门，angular.z 就是方向盘。",
  "你不会跟车喊「左轮转多少、右轮转多少」，那是底盘该干的活。分层的好处在这：上层只管说跑多快、拐多急，不用懂底盘结构。",
];
