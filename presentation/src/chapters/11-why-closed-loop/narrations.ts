import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "该请主角了。先回答个问题：为啥不直接给 PWM，非得绕闭环？",
  "因为同样的 PWM，平地和爬坡，轮子转速完全不同。开环给多少是多少，等于没管。",
  "闭环就实在了：目标 100 RPM，实测 90，差 10，就加大一点 PWM。每 20 毫秒修一次，轮子永远被摁在目标附近。",
  "参数在 motion_controller.cpp 开头：kKp 1.0，kKi 6.0，kKd 0.0，PWM 上限 255。",
];
