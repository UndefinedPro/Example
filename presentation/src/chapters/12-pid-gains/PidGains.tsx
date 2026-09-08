import type { ChapterStepProps } from "../../registry/types";
import "./PidGains.css";

/**
 * 12 · pid-gains（4 步）—— P、I、D 三兄弟与两种模式
 * P 差多少补多少 → I 积分水桶 ki=6 → D 未用 kD=0 → 增量式 vs 位置式
 */
export default function PidGains({ step }: ChapterStepProps) {
  /* step 0 —— P：差多少补多少 */
  if (step === 0) {
    return (
      <div key={step} className="pg-scene scene-pad pg-center">
        <div className="kicker">P · 比例</div>
        <div className="pg-term">
          <h2 className="pg-term-head">
            <b className="hero-num">P</b> 误差越大，出力越大
          </h2>
          <div className="pg-bars">
            <span className="pg-bar-row">
              <em>误差大</em>
              <span className="pg-bar">
                <i className="pg-bar-fill pg-bar-err" style={{ animationDelay: "1s" }} />
              </span>
            </span>
            <span className="pg-bar-row">
              <em>出力大</em>
              <span className="pg-bar">
                <i className="pg-bar-fill pg-bar-out" style={{ animationDelay: "2.2s" }} />
              </span>
            </span>
          </div>
          <p className="pg-slogan" style={{ animationDelay: "3.4s" }}>
            差多少，<em>补多少</em>
          </p>
        </div>
      </div>
    );
  }

  /* step 1 —— I：误差攒总账，ki=6 */
  if (step === 1) {
    return (
      <div key={step} className="pg-scene scene-pad">
        <div className="kicker">I · 积分</div>
        <div className="pg-i">
          <div className="pg-bucket">
            <svg viewBox="0 0 160 240" aria-hidden>
              <rect x="30" y="40" width="100" height="180" rx="10" className="pg-bucket-body" />
              <g className="pg-drops">
                <circle cx="60" cy="12" r="7" />
                <circle cx="86" cy="2" r="7" />
                <circle cx="106" cy="16" r="7" />
              </g>
              <rect x="36" y="150" width="88" height="64" rx="6" className="pg-bucket-fill" />
            </svg>
            <em>误差攒起来，算总账</em>
          </div>
          <div className="pg-i-text">
            <h2 className="pg-term-head">
              <b className="hero-num">I</b> 专治「长期差一点点」的稳态误差
            </h2>
            <span className="pg-ki" style={{ animationDelay: "2.6s" }}>
              这台车 <code>ki = 6</code>，<b>挺大</b>
            </span>
            <p className="pg-i-note" style={{ animationDelay: "4s" }}>
              说明电机低速阻力明显，主要靠 <b>I 硬拉起来</b>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* step 2 —— D：抑制超调，本车未用 */
  if (step === 2) {
    return (
      <div key={step} className="pg-scene scene-pad">
        <div className="kicker">D · 微分</div>
        <div className="pg-d">
          <svg viewBox="0 0 1000 300" className="pg-d-curve" aria-hidden>
            <path d="M20 250 H980" className="pg-d-axis" />
            <text x="950" y="238" textAnchor="middle" className="pg-d-target mono">目标</text>
            <path d="M20 250 C 180 250, 300 240, 420 160 S 560 40, 660 90 S 840 180, 960 150" className="pg-d-line" />
            <circle cx="600" cy="52" r="12" className="pg-d-peak" />
            <text x="600" y="26" textAnchor="middle" className="pg-d-peak-label">超调</text>
          </svg>
          <div className="pg-d-foot">
            <span className="pg-d-desc">
              看<em>误差变化率</em>，把冲过头的劲儿压回去
            </span>
            <span className="pg-stamp" style={{ animationDelay: "3.2s" }}>
              本车未用 · kD = 0
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* step 3 —— 增量式 vs 位置式 */
  return (
    <div key={step} className="pg-scene scene-pad">
      <div className="kicker">PID CONTROLLER 组件 · 支持两种模式</div>
      <div className="pg-modes">
        <div className="pg-mode" style={{ animationDelay: "0.5s" }}>
          <code className="pg-mode-tag">kIncremental</code>
          <b className="pg-mode-name">增量式</b>
          <span className="pg-mode-use">速度环用它</span>
          <p className="pg-mode-why">输出的是 PWM <b>增量</b>，天然平滑，不会猛跳</p>
        </div>
        <div className="pg-mode" style={{ animationDelay: "2.2s" }}>
          <code className="pg-mode-tag">kPositional</code>
          <b className="pg-mode-name">位置式</b>
          <span className="pg-mode-use">位置环用它</span>
          <p className="pg-mode-why">直接算出该到的量</p>
        </div>
      </div>
    </div>
  );
}
