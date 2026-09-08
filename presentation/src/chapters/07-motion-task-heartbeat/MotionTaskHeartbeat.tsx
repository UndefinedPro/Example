import type { ChapterStepProps } from "../../registry/types";
import "./MotionTaskHeartbeat.css";

const MODES = [
  { mode: "0", name: "速度控制", sub: "Drive", delay: "0.5s" },
  { mode: "1", name: "定点控制", sub: "去固定目标点", delay: "1.7s" },
  { mode: "2", name: "相对位移控制", sub: "走一段距离", delay: "2.9s" },
  { mode: "3 / 6", name: "单轮 / 双轮直控", sub: "调试用", delay: "4.1s" },
];

/**
 * 07 · motion-task-heartbeat（4 步）—— motion_task：20ms 心跳与收指令
 * 文件卡 → 五件事空槽 → 槽位1收指令 → control_mode 模式表
 */
export default function MotionTaskHeartbeat({ step }: ChapterStepProps) {
  /* step 0 —— 文件卡 + 20ms 心跳 */
  if (step === 0) {
    return (
      <div key={step} className="mt-scene scene-pad mt-center">
        <div className="kicker">THE SCHEDULER · 运动控制的总调度</div>
        <code className="mt-file mono" style={{ animationDelay: "0.3s" }}>
          main/tasks/control/motion_task.cpp
        </code>
        <div className="mt-beat">
          <svg viewBox="0 0 200 200" className="mt-watch" aria-hidden>
            <circle cx="100" cy="100" r="26" className="mt-watch-halo" />
            <circle cx="100" cy="100" r="80" className="mt-watch-rim" />
            <path d="M100 100 L100 44 M100 100 L138 122" className="mt-watch-hands" />
            <circle cx="100" cy="100" r="8" className="mt-watch-pin" />
          </svg>
          <div className="mt-beat-num">
            <span className="hero-num">20</span>
            <em>ms 一轮</em>
          </div>
        </div>
        <p className="mt-beat-note" style={{ animationDelay: "2.6s" }}>
          <code>vTaskDelay(pdMS_TO_TICKS(20))</code> —— 就是它的心跳
        </p>
      </div>
    );
  }

  /* step 1 —— 五件事空槽骨架 */
  if (step === 1) {
    return (
      <div key={step} className="mt-scene scene-pad mt-center">
        <div className="kicker">EVERY CYCLE · 每一圈干五件事</div>
        <div className="mt-slots">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="mt-slot" style={{ animationDelay: `${0.15 + (n - 1) * 0.2}s` }}>
              <em>{String(n).padStart(2, "0")}</em>
              <span className="mt-slot-blank" />
            </span>
          ))}
        </div>
      </div>
    );
  }

  /* step 2 —— 槽位 1：收指令 */
  if (step === 2) {
    return (
      <div key={step} className="mt-scene scene-pad">
        <div className="mt-body">
          <aside className="mt-rail">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className={`mt-slot mt-slot-rail ${n === 1 ? "is-on" : ""}`}>
                <em>{String(n).padStart(2, "0")}</em>
                <span className="mt-slot-blank" />
              </span>
            ))}
          </aside>
          <div className="mt-detail">
            <div className="mt-detail-card">
              <em className="label-mono">STEP 01 · 收指令</em>
              <code className="mt-api">xQueueReceive(q_motion_cmd, …)</code>
              <p className="mt-api-note">
                从队列里取<b>最新</b>的运动指令
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* step 3 —— control_mode 模式表 */
  return (
    <div key={step} className="mt-scene scene-pad">
      <div className="mt-body">
        <aside className="mt-rail">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={`mt-slot mt-slot-rail ${n === 1 ? "is-done" : ""}`}>
              <em>{String(n).padStart(2, "0")}</em>
              {n === 1 && <i className="mt-slot-check">✓</i>}
              <span className="mt-slot-blank" />
            </span>
          ))}
        </aside>
        <div className="mt-detail">
          <div className="mt-detail-card mt-mode-card">
            <em className="label-mono">指令里带个 control_mode · 区分好几种模式</em>
            <div className="mt-modes">
              {MODES.map((m) => (
                <span key={m.mode} className="mt-mode" style={{ animationDelay: m.delay }}>
                  <b className="mt-mode-no hero-num">{m.mode}</b>
                  <span className="mt-mode-name">{m.name}</span>
                  <span className="mt-mode-sub">{m.sub}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
