import type { ChapterStepProps } from "../../registry/types";
import "./WhyClosedLoop.css";

/**
 * 11 · why-closed-loop（4 步）—— 为啥不直接给 PWM
 * 问题大字 → 开环失效对比 → 闭环修正环 → PID 参数卡
 */
export default function WhyClosedLoop({ step }: ChapterStepProps) {
  /* step 0 —— 问题大字 */
  if (step === 0) {
    return (
      <div key={step} className="wc-scene scene-pad wc-center">
        <div className="kicker">ENTER PID · 该请主角了</div>
        <h1 className="wc-q">
          为啥不直接给 <span className="hero-num">PWM</span>？
        </h1>
        <p className="wc-q-sub">非得绕一个闭环？</p>
      </div>
    );
  }

  /* step 1 —— 开环失效：同一 PWM，平地 vs 爬坡 */
  if (step === 1) {
    return (
      <div key={step} className="wc-scene scene-pad">
        <div className="kicker">OPEN LOOP · 开环给多少是多少</div>
        <div className="wc-badge-row">
          <span className="wc-badge" style={{ animationDelay: "0.3s" }}>
            同一个 PWM
          </span>
        </div>
        <div className="wc-vs">
          <div className="wc-case" style={{ animationDelay: "1s" }}>
            <span className="wc-case-name">平地</span>
            <span className="wc-case-bar">
              <i className="wc-case-fill" style={{ animationDelay: "1.5s" }} />
            </span>
            <span className="wc-case-val">
              转速 <b className="hero-num">100</b>
            </span>
          </div>
          <div className="wc-case" style={{ animationDelay: "2.5s" }}>
            <span className="wc-case-name">爬坡</span>
            <span className="wc-case-bar">
              <i className="wc-case-fill wc-case-fill-low" style={{ animationDelay: "3s" }} />
            </span>
            <span className="wc-case-val">
              转速 <b className="hero-num">明显变慢</b>
            </span>
          </div>
        </div>
        <p className="wc-verdict" style={{ animationDelay: "4.6s" }}>
          开环给多少是多少，<em>等于没管</em>。
        </p>
      </div>
    );
  }

  /* step 2 —— 闭环修正环 */
  if (step === 2) {
    return (
      <div key={step} className="wc-scene scene-pad">
        <div className="kicker">CLOSED LOOP · 闭环就实在了</div>
        <div className="wc-loop">
          <div className="wc-loop-top">
            <span className="wc-node" style={{ animationDelay: "0.5s" }}>
              目标 <b className="hero-num">100</b> RPM
            </span>
            <i className="wc-loop-arrow" style={{ animationDelay: "1.4s" }} />
            <span className="wc-node wc-node-diff" style={{ animationDelay: "1.7s" }}>
              差 <b className="hero-num">10</b> → 加大一点 PWM
            </span>
            <i className="wc-loop-arrow" style={{ animationDelay: "2.6s" }} />
            <span className="wc-node" style={{ animationDelay: "2.9s" }}>
              实测 <b className="hero-num">90</b> RPM
            </span>
          </div>
          <div className="wc-loop-back">
            <i className="wc-loop-return" style={{ animationDelay: "3.6s" }} />
            <span className="wc-loop-back-label" style={{ animationDelay: "4s" }}>
              实测喂回去，接着比
            </span>
          </div>
        </div>
        <div className="wc-cycle" style={{ animationDelay: "5s" }}>
          <svg viewBox="0 0 60 60" className="wc-cycle-ico" aria-hidden>
            <path d="M50 30 A20 20 0 1 1 36 11 m-2 12 2 -12 -12 2" className="wc-cycle-path" />
          </svg>
          每 <b className="hero-num">20ms</b> 修一次 · 轮子永远被摁在目标附近
        </div>
      </div>
    );
  }

  /* step 3 —— 参数卡 */
  return (
    <div key={step} className="wc-scene scene-pad wc-center">
      <div className="kicker">GAINS · 参数在 motion_controller.cpp 开头</div>
      <div className="wc-params">
        {[
          { k: "kKp", v: "1.0", d: "比例" },
          { k: "kKi", v: "6.0", d: "积分" },
          { k: "kKd", v: "0.0", d: "微分" },
          { k: "kMaxPwm", v: "255", d: "PWM 上限" },
        ].map((p, i) => (
          <span key={p.k} className="wc-param" style={{ animationDelay: `${0.5 + i * 0.9}s` }}>
            <code>{p.k}</code>
            <b className="hero-num">{p.v}</b>
            <em>{p.d}</em>
          </span>
        ))}
      </div>
    </div>
  );
}
