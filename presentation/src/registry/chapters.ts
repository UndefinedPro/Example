import type { ChapterDef } from "./types";

import ColdOpen from "../chapters/01-coldopen/ColdOpen";
import { narrations as n01 } from "../chapters/01-coldopen/narrations";
import CmdvelTwist from "../chapters/02-cmdvel-twist/CmdvelTwist";
import { narrations as n02 } from "../chapters/02-cmdvel-twist/narrations";
import DiffKinematics from "../chapters/03-diff-kinematics/DiffKinematics";
import { narrations as n03 } from "../chapters/03-diff-kinematics/narrations";
import KinematicsDetail from "../chapters/04-kinematics-detail/KinematicsDetail";
import { narrations as n04 } from "../chapters/04-kinematics-detail/narrations";
import OdomInverse from "../chapters/05-odom-inverse/OdomInverse";
import { narrations as n05 } from "../chapters/05-odom-inverse/narrations";
import Journey from "../chapters/06-journey/Journey";
import { narrations as n06 } from "../chapters/06-journey/narrations";
import MotionTaskHeartbeat from "../chapters/07-motion-task-heartbeat/MotionTaskHeartbeat";
import { narrations as n07 } from "../chapters/07-motion-task-heartbeat/narrations";
import MotionTaskLoop from "../chapters/08-motion-task-loop/MotionTaskLoop";
import { narrations as n08 } from "../chapters/08-motion-task-loop/narrations";
import EncoderOdom from "../chapters/09-encoder-odom/EncoderOdom";
import { narrations as n09 } from "../chapters/09-encoder-odom/narrations";
import LoopPwm from "../chapters/10-loop-pwm/LoopPwm";
import { narrations as n10 } from "../chapters/10-loop-pwm/narrations";
import WhyClosedLoop from "../chapters/11-why-closed-loop/WhyClosedLoop";
import { narrations as n11 } from "../chapters/11-why-closed-loop/narrations";
import PidGains from "../chapters/12-pid-gains/PidGains";
import { narrations as n12 } from "../chapters/12-pid-gains/narrations";
import OdomToTf from "../chapters/13-odom-to-tf/OdomToTf";
import { narrations as n13 } from "../chapters/13-odom-to-tf/narrations";
import HandsOn from "../chapters/14-hands-on/HandsOn";
import { narrations as n14 } from "../chapters/14-hands-on/narrations";
import Faq from "../chapters/15-faq/Faq";
import { narrations as n15 } from "../chapters/15-faq/narrations";
import WrapUp from "../chapters/16-wrap-up/WrapUp";
import { narrations as n16 } from "../chapters/16-wrap-up/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 */
export const CHAPTERS: ChapterDef[] = [
  { id: "01-coldopen", title: "开场：轮子是怎么听懂的", narrations: n01, Component: ColdOpen },
  { id: "02-cmdvel-twist", title: "/cmd_vel：油门加方向盘", narrations: n02, Component: CmdvelTwist },
  { id: "03-diff-kinematics", title: "差速运动学：转速差的直觉", narrations: n03, Component: DiffKinematics },
  { id: "04-kinematics-detail", title: "半轮距 75：公式的数字与单位", narrations: n04, Component: KinematicsDetail },
  { id: "05-odom-inverse", title: "倒着算：里程计的来源", narrations: n05, Component: OdomInverse },
  { id: "06-journey", title: "一条 cmd_vel 的完整旅程", narrations: n06, Component: Journey },
  { id: "07-motion-task-heartbeat", title: "motion_task：20ms 心跳与收指令", narrations: n07, Component: MotionTaskHeartbeat },
  { id: "08-motion-task-loop", title: "每圈的另一半：参数、急停、循环、遥测", narrations: n08, Component: MotionTaskLoop },
  { id: "09-encoder-odom", title: "Update 上半场：读编码器与里程计", narrations: n09, Component: EncoderOdom },
  { id: "10-loop-pwm", title: "Update 下半场：外环、内环、死区补偿", narrations: n10, Component: LoopPwm },
  { id: "11-why-closed-loop", title: "为啥不直接给 PWM", narrations: n11, Component: WhyClosedLoop },
  { id: "12-pid-gains", title: "P、I、D 三兄弟与两种模式", narrations: n12, Component: PidGains },
  { id: "13-odom-to-tf", title: "上位机：/odom 翻译成 TF", narrations: n13, Component: OdomToTf },
  { id: "14-hands-on", title: "动手验证：让小车画个圆", narrations: n14, Component: HandsOn },
  { id: "15-faq", title: "卡住了对号入座", narrations: n15, Component: Faq },
  { id: "16-wrap-up", title: "四件事 + 下期预告", narrations: n16, Component: WrapUp },
];
