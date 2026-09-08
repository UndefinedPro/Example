import type { ChapterStepProps } from "../../registry/types";
import "./LoopPwm.css";

const SLOTS = ["读编码器", "里程计更新", "外环控制", "内环 PID + 发 PWM"];

/**
 * 10 · loop-pwm（3 步）—— Update 下半场：外环、内环、死区补偿
 * 外环透传 → 每轮 PID → ApplyDeadband 最小 PWM 150
 */
export default function LoopPwm({ step }: ChapterStepProps) {
  // 本节从第 3 件事讲起：槽位下标 2、3；死区补偿仍属内环（下标封顶 3）
  const cur = Math.min(step + 2, 3);

  return (
    <div key={step} className="lp-scene scene-pad">
      <div className="kicker">Update() 下半场 · 还剩两件</div>
      <div className="lp-body">
        <aside className="lp-rail">
          {SLOTS.map((name, i) => {
            const state = i === cur ? "is-on" : i < cur ? "is-done" : "";
            return (
              <span key={name} className={`lp-slot ${state}`}>
                <em>{String(i + 1).padStart(2, "0")}</em>
                <b>{name}</b>
                {i < cur && <i className="lp-check">✓</i>}
              </span>
            );
          })}
        </aside>

        <div className="lp-detail">
          {step === 0 && (
            <div className="lp-card">
              <em className="label-mono">03 · 外环：车体该跑多快</em>
              <div className="lp-outer">
                <span className="lp-box">
                  <em>按控制模式</em>算「该跑多快」
                </span>
                <i className="lp-flow" style={{ animationDelay: "1.6s" }} />
                <span className="lp-box lp-box-accent" style={{ animationDelay: "2s" }}>
                  <em>速度模式下</em>
                  <b>外环 = 命令本身</b>
                </span>
              </div>
              <p className="lp-note" style={{ animationDelay: "3.4s" }}>
                命令<b>直接透传</b>，不多绕一圈
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="lp-card">
              <em className="label-mono">04 · 内环：每个轮子一个 PID</em>
              <div className="lp-pids">
                {["左轮", "右轮"].map((w, i) => (
                  <span key={w} className="lp-pid" style={{ animationDelay: `${0.5 + i * 1.4}s` }}>
                    <em className="lp-pid-name">{w}</em>
                    <span className="lp-pid-io">
                      目标 RPM <b>vs</b> 实测 RPM
                    </span>
                    <i className="lp-pid-arrow" style={{ animationDelay: `${1 + i * 1.4}s` }} />
                    <code className="lp-pid-out">PWM</code>
                  </span>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="lp-card">
              <em className="label-mono">发出去之前 · ApplyDeadband 死区补偿</em>
              <div className="lp-band">
                <div className="lp-axis">
                  <span className="lp-axis-zone lp-axis-zone-dead">出力太小 · 轮子不动</span>
                  <span className="lp-axis-zone lp-axis-zone-live">能转起来了</span>
                  <span className="lp-axis-gate" style={{ animationDelay: "1.6s" }}>
                    <i className="lp-axis-gate-line" />
                    <b className="hero-num">150</b>
                    <em>最小 PWM</em>
                  </span>
                  <span className="lp-try lp-try-weak">
                    <i className="lp-try-bar" />
                    <em>PID 出力太小</em>
                  </span>
                  <span className="lp-try lp-try-boost">
                    <i className="lp-try-bar" />
                    <em>补一脚油门 → 过门槛</em>
                  </span>
                </div>
              </div>
              <p className="lp-note" style={{ animationDelay: "6s" }}>
                主动补这脚油门，<b>小指令也能立刻起步</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
