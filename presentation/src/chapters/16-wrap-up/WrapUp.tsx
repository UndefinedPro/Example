import type { ChapterStepProps } from "../../registry/types";
import "./WrapUp.css";

const POINTS = ["油门加方向盘", "一行差速公式", "20ms 四步循环", "PID 说到做到"];

/**
 * 16 · wrap-up（6 步）—— 四件事 + 下期预告
 * 收束大字 → 要点1-4 逐个点亮 → 第10章传感器预告 + 下期见
 */
export default function WrapUp({ step }: ChapterStepProps) {
  /* step 0 —— 收束大字 */
  if (step === 0) {
    return (
      <div key={step} className="wu-scene scene-pad wu-center">
        <div className="kicker">WRAP UP · 收个尾</div>
        <h1 className="wu-big" style={{ animationDelay: "0.2s" }}>
          今天<em>四件事</em>
        </h1>
      </div>
    );
  }

  /* step 1-4 —— 四个要点逐个点亮 */
  if (step <= 4) {
    const cur = step - 1;
    return (
      <div key={step} className="wu-scene scene-pad">
        <div className="wu-body">
          <aside className="wu-rail">
            {POINTS.map((p, i) => {
              const state = i === cur ? "is-on" : i < cur ? "is-done" : "";
              return (
                <span key={p} className={`wu-item ${state}`}>
                  <em className="wu-item-no hero-num">{["一", "二", "三", "四"][i]}</em>
                  {p}
                  {i < cur && <i className="wu-check">✓</i>}
                </span>
              );
            })}
          </aside>
          <div className="wu-detail">
            {step === 1 && (
              <div className="wu-card">
                <em className="label-mono">一 · 认识指令</em>
                <div className="wu-duo">
                  <span className="wu-chip">
                    油门 <code>linear.x</code>
                  </span>
                  <b className="wu-plus">+</b>
                  <span className="wu-chip">
                    方向盘 <code>angular.z</code>
                  </span>
                </div>
                <p className="wu-note" style={{ animationDelay: "1.8s" }}>
                  cmd_vel 只有这些，<b>轮子的事归底盘</b>
                </p>
              </div>
            )}
            {step === 2 && (
              <div className="wu-card">
                <em className="label-mono">二 · 底盘的数学</em>
                <code className="wu-formula">
                  linear_x <b>±</b> angular_z × <b>75</b>
                </code>
                <p className="wu-note" style={{ animationDelay: "1.6s" }}>
                  一行公式，<b>转速差合成前进 + 转弯</b>
                </p>
              </div>
            )}
            {step === 3 && (
              <div className="wu-card">
                <em className="label-mono">三 · 固件的节拍</em>
                <div className="wu-beat">
                  <b className="hero-num">20ms</b>
                  <span>一拍</span>
                </div>
                <div className="wu-steps">
                  {["编码器", "里程计", "外环内环", "死区补偿"].map((s, i) => (
                    <span key={s} className="wu-step" style={{ animationDelay: `${1.4 + i * 0.7}s` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="wu-card">
                <em className="label-mono">四 · 闭环的承诺</em>
                <div className="wu-pid">
                  <span className="wu-pid-node">目标 RPM</span>
                  <span className="wu-pid-link" />
                  <span className="wu-pid-node">实测 RPM</span>
                </div>
                <p className="wu-note" style={{ animationDelay: "1.8s" }}>
                  PID 让轮子说到做到，<b>稳态误差靠 I 兜底</b>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* step 5 —— 下期预告 */
  return (
    <div key={step} className="wu-scene scene-pad wu-center">
      <div className="kicker">NEXT · 下一章</div>
      <h2 className="wu-next-head">接着拆传感器三件套的固件源码</h2>
      <div className="wu-sensors">
        {[
          { name: "IMU", sub: "姿态" },
          { name: "电池", sub: "电量" },
          { name: "超声波", sub: "测距" },
        ].map((s, i) => (
          <span key={s.name} className="wu-sensor" style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
            <b>{s.name}</b>
            <em>{s.sub}</em>
          </span>
        ))}
      </div>
      <p className="wu-bye" style={{ animationDelay: "2.6s" }}>
        下期见。
      </p>
    </div>
  );
}
