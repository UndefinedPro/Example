import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "motion_task 是运动控制的总调度，每 20 毫秒醒一次。代码里 vTaskDelay 20，就是它的心跳。",
  "每一圈干五件事，步骤特别清晰。",
  "第一件，收指令。xQueueReceive 从 q_motion_cmd 取最新的运动指令。",
  "指令里带个 control_mode，区分好几种模式：0 是速度控制，1 定点控制，2 相对位移，3 和 6 单轮、双轮直控。",
];
