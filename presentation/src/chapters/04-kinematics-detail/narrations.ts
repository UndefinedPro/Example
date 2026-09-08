import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "那个 75 哪来的？代码里叫 kLy，就是半轮距。常量在文件开头写着：轮距 kTrackWidth 150 毫米，轮子直径 65 毫米。",
  "公式的意思也好懂：车体要绕中心转 angular_z，左右轮离中心都是 75 毫米，各自产生正负 75 乘 angular_z 的速度差。",
  "算出来的还是线速度，毫米每秒。可轮子听不懂线速度，只认转速。所以再除以轮子周长，换算成 RPM。kMmsToRpm 干的就是这个换算。",
  "为啥一个公式能走天下？直行、拐弯、原地转，全都是这两个数的加减组合。一行公式，全包了。",
];
