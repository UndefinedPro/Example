import type { ChapterStepProps } from "../../registry/types";
import "./DiffKinematics.css";

/**
 * 03 · diff-kinematics（4 步）—— 差速运动学：转速差的直觉
 * 俯视两轮简图 → 四种转向情况 → 函数卡 → 两行公式
 */
export default function DiffKinematics({ step }: ChapterStepProps) {
  /* step 0 —— 俯视简图：两轮固定，转弯全靠转速差 */
  if (step === 0) {
    return (
      <div key={step} className="dk-scene scene-pad dk-center">
        <div className="kicker">DIFFERENTIAL · 差速运动学</div>
        <div className="dk-top">
          <svg viewBox="0 0 560 460" className="dk-car-top" aria-hidden>
            <path d="M280 40 v-22 m-12 12 12 -12 12 12" className="dk-forward" />
            <rect x="150" y="80" width="260" height="330" rx="34" className="dk-body" />
            <g className="dk-wheel-l">
              <rect x="106" y="130" width="40" height="110" rx="12" />
            </g>
            <g className="dk-wheel-r">
              <rect x="414" y="130" width="40" height="110" rx="12" />
            </g>
            <circle cx="280" cy="245" r="10" className="dk-center-dot" />
            <path d="M156 320 h34 M370 320 h34" className="dk-wheel-tick" />
          </svg>
          <span className="dk-wheel-label dk-wheel-label-l">
            <i>轮L</i>固定在左
          </span>
          <span className="dk-wheel-label dk-wheel-label-r">
            <i>轮R</i>固定在右
          </span>
        </div>
        <h1 className="dk-slogan">
          转向，全靠<em>两边转速差</em>
        </h1>
        <p className="dk-slogan-sub">不会像汽车前轮那样拐弯 —— 这套数学就叫差速运动学</p>
      </div>
    );
  }

  /* step 1 —— 四种转向情况 */
  if (step === 1) {
    return (
      <div key={step} className="dk-scene scene-pad">
        <div className="kicker">FOUR CASES · 四种情况看一遍就懂</div>
        <div className="dk-cases">
          <div className="dk-case" style={{ animationDelay: "0.5s" }}>
            <svg viewBox="0 0 190 190" className="dk-case-ico" aria-hidden>
              <rect x="18" y="80" width="26" height="58" rx="7" className="dk-c-wheel is-slow" />
              <rect x="146" y="80" width="26" height="58" rx="7" className="dk-c-wheel" />
              <path d="M95 158 C 95 118, 104 88, 132 62 m-20 4 20 -4 0 21" className="dk-c-path" />
            </svg>
            <b>左轮慢 → 往右拐</b>
          </div>
          <div className="dk-case" style={{ animationDelay: "2.5s" }}>
            <svg viewBox="0 0 190 190" className="dk-case-ico" aria-hidden>
              <rect x="18" y="80" width="26" height="58" rx="7" className="dk-c-wheel" />
              <rect x="146" y="80" width="26" height="58" rx="7" className="dk-c-wheel is-slow" />
              <path d="M95 158 C 95 118, 86 88, 58 62 m20 4 -20 -4 0 21" className="dk-c-path" />
            </svg>
            <b>左轮快 → 往左拐</b>
          </div>
          <div className="dk-case" style={{ animationDelay: "4.5s" }}>
            <svg viewBox="0 0 190 190" className="dk-case-ico" aria-hidden>
              <rect x="18" y="80" width="26" height="58" rx="7" className="dk-c-wheel" />
              <rect x="146" y="80" width="26" height="58" rx="7" className="dk-c-wheel" />
              <path d="M95 162 V44 m-13 15 13 -15 13 15" className="dk-c-path" />
            </svg>
            <b>两轮同速 → 直行</b>
          </div>
          <div className="dk-case" style={{ animationDelay: "6.5s" }}>
            <svg viewBox="0 0 190 190" className="dk-case-ico" aria-hidden>
              <rect x="18" y="80" width="26" height="58" rx="7" className="dk-c-wheel" />
              <rect x="146" y="80" width="26" height="58" rx="7" className="dk-c-wheel is-flip" />
              <path d="M136 96 A42 42 0 1 0 141 118 m-15 6 16 -2 -1 16" className="dk-c-path" />
            </svg>
            <b>左右反转 → 原地转</b>
          </div>
        </div>
      </div>
    );
  }

  /* step 2 —— 源码：一个函数，核心两行 */
  if (step === 2) {
    return (
      <div key={step} className="dk-scene scene-pad dk-center">
        <div className="kicker">IN SOURCE · 源码里就是个函数</div>
        <div className="dk-fn">
          <span className="dk-fn-file mono">main/control/motion_controller.cpp</span>
          <code className="dk-fn-name">
            <span className="dk-fn-ret">void</span> CalculateKinematics()
          </code>
        </div>
        <p className="dk-fn-note">
          核心就<em>两行</em>
        </p>
      </div>
    );
  }

  /* step 3 —— 两行公式 */
  return (
    <div key={step} className="dk-scene scene-pad dk-center">
      <div className="kicker">TWO LINES · 全部数学就这两行</div>
      <div className="dk-code card">
        <p className="dk-code-line" style={{ animationDelay: "0.6s" }}>
          <span className="dk-var">final_target_vel_[0]</span> = ( linear_x{" "}
          <span className="dk-op">−</span> angular_z * <span className="dk-hl">kLy</span> ) *{" "}
          <span className="dk-hl">kMmsToRpm</span>;
          <i className="dk-code-cm">// 左轮</i>
        </p>
        <hr className="rule" />
        <p className="dk-code-line" style={{ animationDelay: "2s" }}>
          <span className="dk-var">final_target_vel_[1]</span> = ( linear_x{" "}
          <span className="dk-op">+</span> angular_z * <span className="dk-hl">kLy</span> ) *{" "}
          <span className="dk-hl">kMmsToRpm</span>;
          <i className="dk-code-cm">// 右轮</i>
        </p>
      </div>
      <div className="dk-keys">
        <span className="dk-key" style={{ animationDelay: "3.4s" }}>
          <code>kLy</code> = 75，半轮距
        </span>
        <span className="dk-key" style={{ animationDelay: "4.4s" }}>
          <code>kMmsToRpm</code> = 毫米每秒 → 转速
        </span>
      </div>
    </div>
  );
}
