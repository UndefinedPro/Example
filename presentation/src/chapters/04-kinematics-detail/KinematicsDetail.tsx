import type { ChapterStepProps } from "../../registry/types";
import "./KinematicsDetail.css";

const CONSTS = [
  { name: "kTrackWidth", val: "150", unit: "mm", desc: "轮距", star: false },
  { name: "kWheelDiameter", val: "65", unit: "mm", desc: "轮子直径", star: false },
  { name: "kLy", val: "75", unit: "mm", desc: "半轮距", star: true },
];

/**
 * 04 · kinematics-detail（4 步）—— 半轮距 75：公式的数字与单位
 * 常量表 → 几何含义示意 → mm/s→RPM 换算链 → 三动作收拢到一行公式
 */
export default function KinematicsDetail({ step }: ChapterStepProps) {
  /* step 0 —— 常量表 */
  if (step === 0) {
    return (
      <div key={step} className="kt-scene scene-pad">
        <div className="kicker">WHERE 75 COMES FROM · 那个 75 哪来的</div>
        <h2 className="kt-head">
          代码里叫 <code>kLy</code>，就是<em>半轮距</em>
        </h2>
        <div className="kt-table">
          {CONSTS.map((c, i) => (
            <div
              key={c.name}
              className={`kt-row ${c.star ? "is-star" : ""}`}
              style={{ animationDelay: `${0.5 + i * 1.1}s` }}
            >
              <code className="kt-row-name">{c.name}</code>
              <span className="kt-row-val">
                <b className="hero-num">{c.val}</b>
                <i>{c.unit}</i>
              </span>
              <span className="kt-row-desc">{c.desc}</span>
            </div>
          ))}
        </div>
        <p className="kt-note" style={{ animationDelay: "3.8s" }}>
          常量定义在文件开头 · <b>75 = 150 ÷ 2</b>
        </p>
      </div>
    );
  }

  /* step 1 —— 几何含义：绕中心转，左右各 ±75 × angular_z */
  if (step === 1) {
    return (
      <div key={step} className="kt-scene scene-pad">
        <div className="kicker">GEOMETRY · 公式的意思</div>
        <h2 className="kt-head">
          车体绕中心转 <code>angular_z</code>，左右轮各产生速度差
        </h2>
        <div className="kt-geo">
          <svg viewBox="0 0 1200 420" className="kt-geo-svg" aria-hidden>
            <path d="M600 96 a96 60 0 1 0 2 0 m-40 -18 -14 16 20 8" className="kt-geo-rot" />
            <text x="600" y="52" textAnchor="middle" className="kt-geo-rot-label mono">
              angular_z
            </text>
            <rect x="356" y="180" width="46" height="130" rx="12" className="kt-geo-wheel" />
            <rect x="798" y="180" width="46" height="130" rx="12" className="kt-geo-wheel" />
            <rect x="470" y="150" width="260" height="190" rx="30" className="kt-geo-body" />
            <circle cx="600" cy="245" r="11" className="kt-geo-dot" />
            <path d="M482 245 H402 m18 -10 -18 10 18 10 M718 245 h98 m-18 -10 18 10 -18 10" className="kt-geo-lead" />
            <text x="420" y="160" textAnchor="middle" className="kt-geo-lead-label mono">
              75mm
            </text>
            <text x="780" y="160" textAnchor="middle" className="kt-geo-lead-label mono">
              75mm
            </text>
          </svg>
          <div className="kt-geo-tags">
            <span className="kt-geo-tag" style={{ animationDelay: "2.2s" }}>
              左轮 <code>− angular_z × 75</code>
            </span>
            <span className="kt-geo-tag kt-geo-tag-r" style={{ animationDelay: "3.2s" }}>
              右轮 <code>+ angular_z × 75</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* step 2 —— 单位换算链 */
  if (step === 2) {
    return (
      <div key={step} className="kt-scene scene-pad kt-center">
        <div className="kicker">UNIT CONVERSION · 单位换算</div>
        <h2 className="kt-head">
          轮子听不懂线速度，<em>只认转速</em>
        </h2>
        <div className="kt-chain">
          <span className="kt-chain-node" style={{ animationDelay: "0.5s" }}>
            <em className="label-mono">STEP 1</em>
            <b>期望线速度</b>
            <code>mm/s</code>
          </span>
          <span className="kt-chain-mid" style={{ animationDelay: "2.4s" }}>
            ÷ 轮子周长
            <i className="kt-chain-arrow" />
          </span>
          <span className="kt-chain-node" style={{ animationDelay: "4.2s" }}>
            <em className="label-mono">STEP 2</em>
            <b>转速</b>
            <code>RPM</code>
          </span>
        </div>
        <span className="kt-badge" style={{ animationDelay: "5.4s" }}>
          <code>kMmsToRpm</code> 干的就是这个换算 · 算完交给速度环执行
        </span>
      </div>
    );
  }

  /* step 3 —— 三个动作收拢到一行公式 */
  return (
    <div key={step} className="kt-scene scene-pad kt-center">
      <div className="kicker">ONE FORMULA FOR ALL · 一个公式走天下</div>
      <div className="kt-actions">
        {[
          { name: "直行", d: "M95 168 V44 m-14 16 14 -16 14 16", delay: "0.5s" },
          { name: "拐弯", d: "M95 168 C 95 116, 106 82, 138 58 m-22 4 22 -4 -2 22", delay: "1.3s" },
          { name: "原地转", d: "M140 100 A46 46 0 1 0 144 122 m-16 6 17 -3 -2 17", delay: "2.1s" },
        ].map((a) => (
          <span key={a.name} className="kt-action" style={{ animationDelay: a.delay }}>
            <svg viewBox="0 0 190 190" aria-hidden>
              <rect x="16" y="82" width="24" height="52" rx="6" className="kt-a-wheel" />
              <rect x="150" y="82" width="24" height="52" rx="6" className="kt-a-wheel" />
              <path d={a.d} className="kt-a-path" />
            </svg>
            <b>{a.name}</b>
          </span>
        ))}
      </div>
      <div className="kt-formula" style={{ animationDelay: "3.2s" }}>
        <code>
          linear_x <b>±</b> angular_z × <b>75</b>
        </code>
        <span>全都是这两个数的加减组合</span>
      </div>
      <p className="kt-close" style={{ animationDelay: "4.4s" }}>
        一行公式，<em>全包了</em>。
      </p>
    </div>
  );
}
