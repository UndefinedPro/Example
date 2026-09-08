import type { ChapterStepProps } from "../../registry/types";
import "./EncoderOdom.css";

const SLOTS = ["读编码器", "里程计更新", "外环控制", "内环 PID + 发 PWM"];

/**
 * 09 · encoder-odom（5 步）—— Update 上半场：读编码器与里程计
 * 四件事总览 → 脉冲换 RPM → sign 取负 → 低通滤波 → 积分出里程
 */
export default function EncoderOdom({ step }: ChapterStepProps) {
  /* step 0 —— Update() 四件事总览（空槽） */
  if (step === 0) {
    return (
      <div key={step} className="eo-scene scene-pad eo-center">
        <div className="kicker">INSIDE Update() · 进 motion_controller 看一眼</div>
        <div className="eo-file-card">
          <code className="eo-file mono">motion_controller.cpp · Update()</code>
          <p className="eo-file-note">源码注释写得明明白白 —— 每轮四件事</p>
          <div className="eo-skel">
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className="eo-skel-slot" style={{ animationDelay: `${0.6 + (n - 1) * 0.35}s` }}>
                <em>{String(n).padStart(2, "0")}</em>
                <span className="eo-skel-blank" />
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* step 1-4 —— 左轨四槽 + 右侧细节 */
  // stepIdx 0 = 四个空槽；stepIdx 1-3 = 槽位 1；stepIdx 4 = 槽位 2
  const cur = step === 0 ? -1 : Math.min(1, step - 1);
  return (
    <div key={step} className="eo-scene scene-pad">
      <div className="eo-body">
        <aside className="eo-rail">
          {SLOTS.map((name, i) => {
            const state = i === cur ? "is-on" : i < cur ? "is-done" : "";
            return (
              <span key={name} className={`eo-slot ${state}`}>
                <em>{String(i + 1).padStart(2, "0")}</em>
                <b>{name}</b>
                {i < cur && <i className="eo-check">✓</i>}
              </span>
            );
          })}
        </aside>

        <div className="eo-detail">
          {step === 1 && (
            <div className="eo-card">
              <em className="label-mono">01 · 读编码器</em>
              <div className="eo-chain">
                <svg viewBox="0 0 130 130" className="eo-enc" aria-hidden>
                  <circle cx="65" cy="65" r="50" className="eo-enc-rim" />
                  <path d="M65 15 v30 M65 85 v30 M15 65 h30 M85 65 h30" className="eo-enc-teeth" />
                  <circle cx="65" cy="65" r="12" className="eo-enc-hub" />
                </svg>
                <span className="eo-chain-node">脉冲差</span>
                <i className="eo-chain-arrow" style={{ animationDelay: "1.6s" }} />
                <span className="eo-chain-node" style={{ animationDelay: "2s" }}>
                  每秒脉冲数
                </span>
                <i className="eo-chain-arrow" style={{ animationDelay: "3.4s" }} />
                <span className="eo-chain-node eo-chain-node-rpm" style={{ animationDelay: "3.8s" }}>
                  RPM
                </span>
              </div>
              <p className="eo-note" style={{ animationDelay: "4.8s" }}>
                轮子实际转多快，<b>全靠它汇报</b>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="eo-card">
              <em className="label-mono">藏在里面的细节</em>
              <code className="eo-sign">{"sign = {1, -1}"}</code>
              <p className="eo-sign-desc" style={{ animationDelay: "1.6s" }}>
                右轮电机<b>装反了</b>，读数得<em>取负</em>
              </p>
              <span className="eo-chip" style={{ animationDelay: "3.4s" }}>
                软件里取个负号 · 一行搞定，省得拆车重装
              </span>
            </div>
          )}

          {step === 3 && (
            <div className="eo-card">
              <em className="label-mono">一阶低通滤波 · 抹平毛刺</em>
              <svg viewBox="0 0 1000 260" className="eo-curve" aria-hidden>
                <path
                  d="M10 130 L50 70 L90 170 L130 60 L170 175 L210 75 L250 165 L290 70 L330 170 L370 65 L410 172 L450 78 L490 162 L530 72 L570 168 L610 76 L650 160 L690 80 L730 158 L770 82 L810 156 L850 84 L890 152 L930 86 L970 148"
                  className="eo-curve-raw"
                />
                <path
                  d="M10 128 C 120 120, 220 118, 340 120 S 620 124, 780 122 S 940 120, 990 121"
                  className="eo-curve-lp"
                />
              </svg>
              <div className="eo-legend">
                <span className="eo-legend-item">
                  <i className="eo-dot-raw" /> 原始转速 · 带毛刺
                </span>
                <span className="eo-legend-item">
                  <i className="eo-dot-lp" /> 滤波后 ·{" "}
                  <code>kAlpha = 0.35</code>
                </span>
              </div>
              <p className="eo-note" style={{ animationDelay: "4.6s" }}>
                实测值稳了，PID 才不会<b>追着噪声乱出力</b>
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="eo-card">
              <em className="label-mono">02 · 里程计更新</em>
              <div className="eo-int">
                <span className="eo-int-src">滤波后的轮速</span>
                <i className="eo-int-arrow" style={{ animationDelay: "1.2s" }} />
                <span className="eo-int-mid">
                  积分
                  <svg viewBox="0 0 90 60" aria-hidden>
                    <path d="M6 52 C 20 10, 40 10, 50 34 S 80 52, 86 14" className="eo-int-sym" />
                  </svg>
                </span>
                <i className="eo-int-arrow" style={{ animationDelay: "2s" }} />
                <span className="eo-int-out">
                  <b>x</b>
                  <b>y</b>
                  <b>yaw</b>
                </span>
              </div>
              <div className="eo-odo" style={{ animationDelay: "3s" }}>
                <em>total_distance_</em>
                <span className="eo-odo-bar">
                  <i />
                </span>
                <span className="eo-odo-cap">总里程，一路攒着</span>
              </div>
              <p className="eo-note" style={{ animationDelay: "4.2s" }}>
                标准二轮里程计公式
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
