import type { ChapterStepProps } from "../../registry/types";
import "./ColdOpen.css";

const LAYERS = [
  { tag: "L1", name: "Twist 消息", sub: "linear.x / angular.z" },
  { tag: "L2", name: "差速运动学", sub: "CalculateKinematics" },
  { tag: "L3", name: "指令队列", sub: "q_motion_cmd" },
  { tag: "L4", name: "PID 闭环", sub: "20ms 修一次" },
];

/**
 * 01 · coldopen（3 步）—— 开场：轮子是怎么听懂的
 * 终端发令 + 小车剪影开动 → 链路四层依次亮起 → 片名卡
 */
export default function ColdOpen({ step }: ChapterStepProps) {
  /* step 0 —— 终端发令，小车开动，抛出问句 */
  if (step === 0) {
    return (
      <div key={step} className="co-scene scene-pad co-center">
        <div className="co-term">
          <div className="co-term-bar">
            <i />
            <i />
            <i />
            <span className="co-term-title">terminal — ros2</span>
          </div>
          <p className="co-term-line">
            <span className="co-prompt">$</span>
            {"ros2 topic pub -r 10 /cmd_vel geometry_msgs/msg/Twist "}
            <b>{'"'}{"{linear: {x: 0.2}, angular: {z: 0.0}}"}{'"'}</b>
          </p>
          <p className="co-term-echo">
            <span className="co-prompt">›</span> publishing #1 …
          </p>
        </div>

        <div className="co-drive">
          <svg viewBox="0 0 900 170" className="co-car-svg" aria-hidden>
            <path d="M20 138 H880" className="co-ground" />
            <g className="co-trail">
              <path d="M40 96 h44 M40 122 h44" />
            </g>
            <g className="co-car-run">
              <rect x="330" y="40" width="250" height="76" rx="14" className="co-car-body" />
              <path d="M415 40 v-20 h96 l44 20 Z" className="co-car-cabin" />
              <rect x="580" y="52" width="34" height="18" rx="4" className="co-car-lidar" />
              <g className="co-wheel-a">
                <circle cx="390" cy="120" r="24" className="co-wheel-rim" />
                <path d="M390 100 v40 M370 120 h40" className="co-wheel-spoke" />
              </g>
              <g className="co-wheel-b">
                <circle cx="530" cy="120" r="24" className="co-wheel-rim" />
                <path d="M530 100 v40 M510 120 h40" className="co-wheel-spoke" />
              </g>
            </g>
            <path d="M812 74 h34 m-12 -10 12 10 -12 10" className="co-arrow" />
          </svg>
          <span className="co-drive-chip mono">linear.x = 0.2 m/s → 小车就往前跑</span>
        </div>

        <h1 className="co-q">
          轮子是怎么<em>听懂</em>的？
        </h1>
      </div>
    );
  }

  /* step 1 —— 链路四层依次亮起 */
  if (step === 1) {
    return (
      <div key={step} className="co-scene scene-pad co-center">
        <div className="kicker">FROM COMMAND TO WHEEL · 中间隔着好几层</div>
        <div className="co-layers">
          {LAYERS.map((l, i) => (
            <span key={l.tag} className="co-layer-slot">
              <span className="co-layer" style={{ animationDelay: `${1.2 + i * 1.8}s` }}>
                <em className="co-layer-tag">{l.tag}</em>
                <b className="co-layer-name">{l.name}</b>
                <code className="co-layer-sub">{l.sub}</code>
              </span>
              {i < LAYERS.length - 1 && (
                <i className="co-layer-link" style={{ animationDelay: `${2.1 + i * 1.8}s` }} />
              )}
            </span>
          ))}
        </div>
        <p className="co-verdict">
          少任何一层，轮子<em>都不转</em>。
        </p>
      </div>
    );
  }

  /* step 2 —— 片名卡 */
  return (
    <div key={step} className="co-scene scene-pad co-center">
      <div className="kicker">CHAPTER 09 · MOTION CONTROL</div>
      <div className="co-title-block">
        <span className="co-title-num hero-num">09</span>
        <h1 className="co-title">运动控制</h1>
        <p className="co-title-sub">
          <code>/cmd_vel</code> 如何变成轮子转动
        </p>
      </div>
      <hr className="rule co-title-rule" />
      <p className="co-title-badge">进小车的神经系统 · 整条链路，一个环节都不跳</p>
    </div>
  );
}
