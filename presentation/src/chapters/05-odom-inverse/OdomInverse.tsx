import type { ChapterStepProps } from "../../registry/types";
import "./OdomInverse.css";

/**
 * 05 · odom-inverse（3 步）—— 倒着算：里程计的来源
 * 正反两个方向 → /odom 积分来源 → 一份数学干两份活
 */
export default function OdomInverse({ step }: ChapterStepProps) {
  /* step 0 —— 公式方向反转：正算控制 / 反算感知 */
  if (step === 0) {
    return (
      <div key={step} className="oi-scene scene-pad oi-center">
        <div className="kicker">RUN IT BACKWARDS · 这公式还能倒着用</div>
        <div className="oi-lane" style={{ animationDelay: "0.4s" }}>
          <span className="oi-lane-io">
            <em>linear.x / angular.z</em>指令
          </span>
          <span className="oi-lane-arrow">
            <code>CalculateKinematics()</code>
            <i className="oi-arrow oi-arrow-fwd" />
          </span>
          <span className="oi-lane-io">
            <em>左右轮转速</em>轮子
          </span>
          <b className="oi-lane-role">正算 · 控制</b>
        </div>
        <div className="oi-lane oi-lane-back" style={{ animationDelay: "2.6s" }}>
          <span className="oi-lane-io">
            <em>左右轮实测转速</em>轮子
          </span>
          <span className="oi-lane-arrow">
            <code>GetVelocity()</code>
            <i className="oi-arrow oi-arrow-back" />
          </span>
          <span className="oi-lane-io">
            <em>linear.x / angular.z</em>车体速度
          </span>
          <b className="oi-lane-role oi-lane-role-b">反算 · 感知</b>
        </div>
        <p className="oi-note">同一个公式，换个方向读</p>
      </div>
    );
  }

  /* step 1 —— /odom 的来源：轮速一圈圈攒出位置 */
  if (step === 1) {
    return (
      <div key={step} className="oi-scene scene-pad">
        <div className="kicker">ODOMETRY · 里程计的来源</div>
        <div className="oi-odom">
          <div className="oi-odom-left">
            <svg viewBox="0 0 160 160" className="oi-wheel" aria-hidden>
              <circle cx="80" cy="80" r="62" className="oi-wheel-rim" />
              <path d="M80 24 V136 M24 80 H136 M42 42 118 118 M118 42 42 118" className="oi-wheel-spoke" />
              <circle cx="80" cy="80" r="14" className="oi-wheel-hub" />
            </svg>
            <span className="oi-odom-cap">轮子转了多少圈、多快</span>
          </div>
          <svg viewBox="0 0 640 300" className="oi-odom-curve" aria-hidden>
            <path d="M30 40 H60 M30 150 H60 M30 260 H60" className="oi-axis" />
            <text x="18" y="46" textAnchor="end" className="oi-axis-label mono">x</text>
            <text x="18" y="156" textAnchor="end" className="oi-axis-label mono">y</text>
            <text x="18" y="266" textAnchor="end" className="oi-axis-label mono">yaw</text>
            <path d="M60 260 C 200 258, 300 220, 380 160 S 540 60, 600 46" className="oi-curve" />
          </svg>
          <div className="oi-odom-right">
            <code className="oi-topic">/odom</code>
            <span className="oi-odom-cap">位置 + 朝向，一路攒起来</span>
          </div>
        </div>
      </div>
    );
  }

  /* step 2 —— 一份数学干两份活 */
  return (
    <div key={step} className="oi-scene scene-pad oi-center">
      <div className="kicker">TWO JOBS · 一份数学干两份活</div>
      <div className="oi-duo">
        <div className="oi-duo-card" style={{ animationDelay: "0.4s" }}>
          <b>正算 = 控制</b>
          <span>发指令 → 算轮速</span>
        </div>
        <span className="oi-duo-x hero-num" style={{ animationDelay: "1.2s" }}>
          1×2
        </span>
        <div className="oi-duo-card" style={{ animationDelay: "1.8s" }}>
          <b>反算 = 感知</b>
          <span>测轮速 → 推车体</span>
        </div>
      </div>
      <p className="oi-close">
        代码少写一半，两头<em>天然一致</em>。
      </p>
    </div>
  );
}
