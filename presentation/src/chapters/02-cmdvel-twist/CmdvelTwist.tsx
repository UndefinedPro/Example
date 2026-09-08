import type { ChapterStepProps } from "../../registry/types";
import "./CmdvelTwist.css";

const FIELDS = [
  { group: "linear", axis: "x", used: true },
  { group: "linear", axis: "y", used: false },
  { group: "linear", axis: "z", used: false },
  { group: "angular", axis: "x", used: false },
  { group: "angular", axis: "y", used: false },
  { group: "angular", axis: "z", used: true },
];

/**
 * 02 · cmdvel-twist（4 步）—— /cmd_vel：油门加方向盘
 * Twist 六分量结构 → 两个在用分量定义 → 驾驶舱比喻 → 分层职责
 */
export default function CmdvelTwist({ step }: ChapterStepProps) {
  /* step 0 —— Twist 消息结构：六个分量，只用俩 */
  if (step === 0) {
    return (
      <div key={step} className="tw-scene scene-pad">
        <div className="kicker">THE MESSAGE · 指令长啥样</div>
        <h2 className="tw-head">
          <code>geometry_msgs/Twist</code> —— 一个消息，塞了六个数
        </h2>
        <div className="tw-grid">
          {FIELDS.map((f, i) => (
            <span
              key={f.group + f.axis}
              className={`tw-cell ${f.used ? "is-used" : "is-idle"}`}
              style={{ animationDelay: `${0.35 + i * 0.4}s` }}
            >
              <em className="tw-cell-group">{f.group}</em>
              <b className="tw-cell-axis mono">.{f.axis}</b>
              {f.used && <i className="tw-cell-flag">本车在用</i>}
            </span>
          ))}
        </div>
        <p className="tw-grid-note">六个分量里，这台小车只用了俩</p>
      </div>
    );
  }

  /* step 1 —— 两个在用分量的定义 */
  if (step === 1) {
    return (
      <div key={step} className="tw-scene scene-pad">
        <div className="kicker">TWO FIELDS · 就这俩</div>
        <div className="tw-defs">
          <div className="tw-def" style={{ animationDelay: "0.3s" }}>
            <code className="tw-def-name">linear.x</code>
            <div className="tw-def-hero">
              <span className="hero-num">m/s</span>
              <span className="tw-def-unit">米每秒</span>
            </div>
            <svg viewBox="0 0 220 60" className="tw-def-ico" aria-hidden>
              <path d="M14 30 H176 m-22 -14 22 14 -22 14" className="tw-arrow-line" />
              <circle cx="204" cy="30" r="9" className="tw-arrow-dot" />
            </svg>
            <p className="tw-def-desc">前进速度 · 正数向前</p>
          </div>
          <div className="tw-def" style={{ animationDelay: "2.4s" }}>
            <code className="tw-def-name">angular.z</code>
            <div className="tw-def-hero">
              <span className="hero-num">rad/s</span>
              <span className="tw-def-unit">弧度每秒</span>
            </div>
            <svg viewBox="0 0 220 60" className="tw-def-ico" aria-hidden>
              <path d="M176 34 A56 26 0 1 0 176 26 m6 -8 -6 8 8 6" className="tw-arrow-line" />
              <circle cx="110" cy="30" r="8" className="tw-arrow-dot" />
            </svg>
            <p className="tw-def-desc">
              绕竖直轴旋转 · 正数逆时针（<em>左转</em>）
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* step 2 —— 驾驶舱比喻：油门 + 方向盘 */
  if (step === 2) {
    return (
      <div key={step} className="tw-scene scene-pad tw-center">
        <div className="kicker">BEST METAPHOR · 最好懂的比喻</div>
        <h2 className="tw-metaphor-head">开车，你天天在用这两样</h2>
        <div className="tw-cockpit">
          <div className="tw-cockpit-item" style={{ animationDelay: "0.9s" }}>
            <svg viewBox="0 0 200 220" className="tw-pedal" aria-hidden>
              <rect x="64" y="26" width="72" height="150" rx="16" className="tw-pedal-face" />
              <path d="M84 58 h32 M84 92 h32 M84 126 h32" className="tw-pedal-grip" />
              <path d="M52 196 h96" className="tw-pedal-base" />
            </svg>
            <span className="tw-cockpit-role">油门</span>
            <code className="tw-cockpit-field">linear.x</code>
          </div>
          <div className="tw-cockpit-item" style={{ animationDelay: "1.8s" }}>
            <svg viewBox="0 0 220 220" className="tw-wheel" aria-hidden>
              <circle cx="110" cy="110" r="86" className="tw-wheel-ring" />
              <circle cx="110" cy="110" r="24" className="tw-wheel-hub" />
              <path d="M110 24 V86 M36 150 l56 -28 M184 150 l-56 -28" className="tw-wheel-arm" />
            </svg>
            <span className="tw-cockpit-role">方向盘</span>
            <code className="tw-cockpit-field">angular.z</code>
          </div>
        </div>
      </div>
    );
  }

  /* step 3 —— 分层：上层说快慢，底盘管轮子 */
  return (
    <div key={step} className="tw-scene scene-pad tw-center">
      <div className="kicker">LAYERING · 分层的好处</div>
      <p className="tw-never">
        你不会跟车喊「左轮转多少、右轮转多少」——那是<em>底盘</em>该干的活。
      </p>
      <div className="tw-stack">
        <div className="tw-stack-layer" style={{ animationDelay: "1.6s" }}>
          <em className="tw-stack-tag">上层 · 你的程序</em>
          <b>只说「跑多快、拐多急」</b>
        </div>
        <div className="tw-stack-bus" style={{ animationDelay: "2.8s" }}>
          <span className="mono">/cmd_vel</span>
          <svg viewBox="0 0 40 88" aria-hidden>
            <path d="M20 4 v66 m-11 -14 11 14 11 -14" className="tw-stack-flow" />
          </svg>
        </div>
        <div className="tw-stack-layer tw-stack-layer-low" style={{ animationDelay: "3.6s" }}>
          <em className="tw-stack-tag">底盘 · firmware</em>
          <b>接住「轮子的事」</b>
        </div>
      </div>
    </div>
  );
}
