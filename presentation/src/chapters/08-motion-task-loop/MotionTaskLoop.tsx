import type { ChapterStepProps } from "../../registry/types";
import "./MotionTaskLoop.css";

const RAIL = ["收指令", "收 PID 参数", "急停检查", "控制循环", "上报遥测"];

/**
 * 08 · motion-task-loop（4 步）—— 每圈的另一半：参数、急停、循环、遥测
 * 槽位2 PID 参数 → 槽位3 急停 → 槽位4 控制循环 → 槽位5 遥测双队列
 */
export default function MotionTaskLoop({ step }: ChapterStepProps) {
  const cur = step + 2; // 本节从槽位 2 讲起：rail 下标 2..5（n = i+1）

  const detail = (
    <>
      {step === 0 && (
        <div className="ml-card">
          <em className="label-mono">STEP 02 · 收 PID 参数</em>
          <p className="ml-title">
            外部能<em>动态调</em>速度环、位置环参数
          </p>
          <span className="ml-chip" style={{ animationDelay: "1.8s" }}>
            不用重烧固件，跑着就能改
          </span>
          <span className="ml-badge" style={{ animationDelay: "2.8s" }}>
            第 17 章 · 调参会用到
          </span>
        </div>
      )}

      {step === 1 && (
        <div className="ml-card">
          <em className="label-mono">STEP 03 · 急停检查</em>
          <div className="ml-stop-flow">
            <code className="ml-stop-var">g_emergency_stop</code>
            <span className="ml-stop-true">
              为真 <i className="ml-stop-arrow" />
            </span>
            <code className="ml-stop-call">robot.Stop()</code>
          </div>
          <p className="ml-slogan" style={{ animationDelay: "3.2s" }}>
            安全永远比运动<em>优先</em>。
          </p>
          <span className="ml-chip" style={{ animationDelay: "4.4s" }}>
            急停排在干活前面 · 真出事慢一步都不行
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="ml-card">
          <em className="label-mono">STEP 04 · 执行控制循环</em>
          <div className="ml-update">
            <span className="ml-src">
              <code>IMU</code>
              偏航角 imu_yaw_rad
            </span>
            <i className="ml-update-arrow" />
            <code className="ml-api">robot.Update(dt, imu_yaw_rad)</code>
          </div>
          <p className="ml-note" style={{ animationDelay: "2.6s" }}>
            dt + IMU 偏航角，一起喂给控制器
          </p>
        </div>
      )}

      {step === 3 && (
        <div className="ml-card">
          <em className="label-mono">STEP 05 · 上报遥测</em>
          <div className="ml-pack">
            <span className="ml-pack-chip">速度</span>
            <span className="ml-pack-chip">里程</span>
            <span className="ml-pack-chip">四元数</span>
            <i className="ml-pack-arrow" />
            <code className="ml-queue">q_motion_state</code>
            <i className="ml-pack-arrow" />
            <code className="ml-topic">/odom</code>
          </div>
          <div className="ml-lanes" style={{ animationDelay: "3.4s" }}>
            <span className="ml-lane">
              <em>收指令</em>q_motion_cmd <b>↓</b>
            </span>
            <span className="ml-lane">
              <em>发遥测</em>q_motion_state <b>↑</b>
            </span>
          </div>
          <p className="ml-note" style={{ animationDelay: "4.6s" }}>
            收和发各走各的队列，<b>互不挡道</b>
          </p>
        </div>
      )}
    </>
  );

  return (
    <div key={step} className="ml-scene scene-pad">
      <div className="kicker">MOTION_TASK · 每一圈的另一半</div>
      <div className="ml-body">
        <aside className="ml-rail">
          {RAIL.map((name, i) => {
            const n = i + 1;
            const state = n === cur ? "is-on" : n < cur ? "is-done" : "";
            return (
              <span key={name} className={`ml-slot ${state}`}>
                <em>{String(n).padStart(2, "0")}</em>
                <b>{name}</b>
                {n < cur && <i className="ml-check">✓</i>}
              </span>
            );
          })}
        </aside>
        <div className="ml-detail">{detail}</div>
      </div>
    </div>
  );
}
