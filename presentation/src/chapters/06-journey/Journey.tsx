import type { ChapterStepProps } from "../../registry/types";
import "./Journey.css";

const UPPER = [
  { name: "/cmd_vel", sub: "电脑发出", at: "0.4s" },
  { name: "microros_task", sub: "micro-ROS 任务收下", at: "1.8s" },
  { name: "q_motion_cmd", sub: "丢进队列", at: "3.2s" },
  { name: "motion_task", sub: "每 20ms 取一次", at: "4.6s" },
  { name: "robot.Drive", sub: "调执行入口", at: "6s" },
];

const LOWER = ["运动学解算", "PID", "PWM", "电机"];

/**
 * 06 · journey（3 步）—— 一条 cmd_vel 的完整旅程
 * 追踪视角开场 → 路线图上半（进固件）→ 路线图下半（轮子开转）
 */
export default function Journey({ step }: ChapterStepProps) {
  /* step 0 —— 追踪视角开场 */
  if (step === 0) {
    return (
      <div key={step} className="jn-scene scene-pad jn-center">
        <div className="kicker">FOLLOW THE PACKET · 追一条指令</div>
        <div className="jn-dispatch">
          <span className="jn-term mono">
            <i>$</i> /cmd_vel 已发出
          </span>
          <svg viewBox="0 0 640 90" className="jn-track" aria-hidden>
            <path d="M12 45 H560" className="jn-track-dots" />
            <g className="jn-packet">
              <rect x="0" y="21" width="48" height="48" rx="8" />
              <path d="M0 21 24 45 48 21 M24 45 v24" />
            </g>
          </svg>
        </div>
        <h1 className="jn-q">
          它要经过<em>几站</em>？
        </h1>
      </div>
    );
  }

  /* step 1 —— 路线图上半：从电脑到 robot.Drive */
  if (step === 1) {
    return (
      <div key={step} className="jn-scene scene-pad">
        <div className="kicker">ROUTE 1/2 · 进固件之前</div>
        <div className="jn-route">
          {UPPER.map((n, i) => (
            <span key={n.name} className="jn-stop-slot">
              <span className="jn-stop" style={{ animationDelay: n.at }}>
                <em className="jn-stop-no">{i + 1}</em>
                <code className="jn-stop-name">{n.name}</code>
                <span className="jn-stop-sub">{n.sub}</span>
              </span>
              {i < UPPER.length - 1 && <i className="jn-stop-link" style={{ animationDelay: n.at }} />}
            </span>
          ))}
        </div>
        <p className="jn-route-note" style={{ animationDelay: "8.4s" }}>
          队列削峰 · 任务按自己的心跳取件
        </p>
      </div>
    );
  }

  /* step 2 —— 路线图下半：motion_controller 到电机 */
  return (
    <div key={step} className="jn-scene scene-pad">
      <div className="kicker">ROUTE 2/2 · motion_controller 内部</div>
      <div className="jn-route jn-route-dim">
        {UPPER.map((n) => (
          <span key={n.name} className="jn-stop jn-stop-done">
            <code className="jn-stop-name">{n.name}</code>
          </span>
        ))}
      </div>
      <div className="jn-route">
        {LOWER.map((n, i) => (
          <span key={n} className="jn-stop-slot">
            <span className="jn-stop" style={{ animationDelay: `${0.5 + i * 1.6}s` }}>
              <code className="jn-stop-name">{n}</code>
            </span>
            {i < LOWER.length - 1 && (
              <i className="jn-stop-link" style={{ animationDelay: `${1.2 + i * 1.6}s` }} />
            )}
          </span>
        ))}
        <svg viewBox="0 0 110 110" className="jn-wheel" style={{ animationDelay: "6.4s" }} aria-hidden>
          <circle cx="55" cy="55" r="42" className="jn-wheel-rim" />
          <path d="M55 13 v84 M13 55 h84" className="jn-wheel-spoke" />
        </svg>
      </div>
      <p className="jn-go" style={{ animationDelay: "7s" }}>
        四站走完，<em>轮子开转</em>。
      </p>
    </div>
  );
}
