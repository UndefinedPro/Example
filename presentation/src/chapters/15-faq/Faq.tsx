import type { ChapterStepProps } from "../../registry/types";
import "./Faq.css";

const QUESTIONS = ["发 cmd_vel 没反应", "小车走不直", "/odom 漂移"];

/**
 * 15 · faq（4 步）—— 卡住了对号入座
 * 三问索引 → Q1 没反应 → Q2 走不直 → Q3 漂移（已讲的灰化保留）
 */
export default function Faq({ step }: ChapterStepProps) {
  /* step 0 —— 三问题索引 */
  if (step === 0) {
    return (
      <div key={step} className="qa-scene scene-pad qa-center">
        <div className="kicker">TROUBLESHOOTING · 卡住了别慌</div>
        <h2 className="qa-index-head">三种情况，对号入座</h2>
        <div className="qa-index">
          {QUESTIONS.map((q, i) => (
            <span key={q} className="qa-index-item" style={{ animationDelay: `${0.15 + i * 0.35}s` }}>
              <em className="hero-num">Q{i + 1}</em>
              {q}
            </span>
          ))}
        </div>
      </div>
    );
  }

  const qi = step - 1;
  const cards = [
    {
      q: "发 cmd_vel 没反应",
      cause: "指令发出去，车那头没人接",
      fixes: [
        { t: "查 micro-ROS agent 连没连上", s: "第 6 章讲过" },
        { t: "查 Web 配置页，切到 micro-ROS 模式", s: null },
      ],
      badge: null as string | null,
    },
    {
      q: "小车走不直",
      cause: "左右轮 PID 特性有差异，或死区不对称",
      fixes: [
        { t: "微调 kDeadband", s: null },
        { t: "用 PID 指令在线调试", s: null },
      ],
      badge: null,
    },
    {
      q: "/odom 漂移",
      cause: "轮式里程计天生会漂 · 打滑没得治",
      fixes: [{ t: "Nav2 融合 IMU + 激光做定位", s: "这才是正解" }],
      badge: "第 15 章见",
    },
  ];
  const a = cards[qi]!;

  return (
    <div key={step} className="qa-scene scene-pad">
      <div className="kicker">TROUBLESHOOTING · 卡住了对号入座</div>
      <div className="qa-body">
        <aside className="qa-rail">
          {QUESTIONS.map((q, i) => (
            <span key={q} className={`qa-rail-item ${i < qi ? "is-done" : i === qi ? "is-on" : ""}`}>
              <em className="hero-num">Q{i + 1}</em>
              {q}
              {i < qi && <i className="qa-check">✓</i>}
            </span>
          ))}
        </aside>
        <div className="qa-detail" key={a.q}>
          <div className="qa-card">
            <h3 className="qa-q">{a.q}</h3>
            <p className="qa-cause">{a.cause}</p>
            <div className="qa-fixes">
              {a.fixes.map((f, i) => (
                <span key={f.t} className="qa-fix" style={{ animationDelay: `${1.2 + i * 1.4}s` }}>
                  <b className="qa-fix-no">Rx{i + 1}</b>
                  <span className="qa-fix-text">
                    {f.t}
                    {f.s && <em>{f.s}</em>}
                  </span>
                </span>
              ))}
            </div>
            {a.badge && (
              <span className="qa-badge" style={{ animationDelay: "4s" }}>
                {a.badge}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
