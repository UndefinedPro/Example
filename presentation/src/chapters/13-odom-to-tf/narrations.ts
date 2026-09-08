import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "小车这边讲完，看电脑这边。固件发的 /odom，nav_msgs 的 Odometry，它只是个话题。可 RViz 和 Nav2 认的是 TF 坐标变换。",
  "翻译官是 xuegecar_bringup 这个节点。它订阅 /odom，收到一条就广播一条 TF：父坐标系 odom，子坐标系 base_footprint。主循环 1000 赫兹 spin_some，持续广播不停。",
  "为啥要这座桥？RViz 画车、Nav2 算路径，问的都是「车在坐标系哪儿」，不是「哪个话题发了啥」。TF 才是它们共同的语言。",
  "这就是话题世界和 TF 世界之间的桥。第 12 章细讲 TF，这里先立块牌子。",
];
