import type { ChapterStepProps } from "../../registry/types";
import "./OdomToTf.css";

/**
 * 13 · odom-to-tf（4 步）—— 上位机：/odom 翻译成 TF
 * 话题/TF 两个世界断层 → 翻译官 bringup 代码 → 为啥要这座桥 → 连桥立牌
 */
export default function OdomToTf({ step }: ChapterStepProps) {
  /* step 0 —— 两个世界之间的沟 */
  if (step === 0) {
    return (
      <div key={step} className="tf-scene scene-pad">
        <div className="kicker">HOST SIDE · 小车讲完，看电脑这边</div>
        <h2 className="tf-head">
          /odom 只是<em>话题</em>，RViz 和 Nav2 认的是 <code>TF</code>
        </h2>
        <div className="tf-worlds">
          <div className="tf-world" style={{ animationDelay: "0.8s" }}>
            <em className="label-mono">话题世界</em>
            <code className="tf-world-topic">/odom</code>
            <span className="tf-world-sub">nav_msgs/Odometry</span>
          </div>
          <svg viewBox="0 0 220 220" className="tf-crack" aria-hidden>
            <path d="M110 8 L88 60 L134 108 L84 160 L120 212" className="tf-crack-line" />
          </svg>
          <div className="tf-world" style={{ animationDelay: "2s" }}>
            <em className="label-mono">TF 世界</em>
            <span className="tf-world-users">
              <b>RViz</b>
              <b>Nav2</b>
            </span>
            <span className="tf-world-sub">坐标变换 · frame 关系</span>
          </div>
        </div>
        <p className="tf-gap-note" style={{ animationDelay: "3.4s" }}>
          中间这道沟，得有人来填
        </p>
      </div>
    );
  }

  /* step 1 —— 翻译官：xuegecar_bringup */
  if (step === 1) {
    return (
      <div key={step} className="tf-scene scene-pad">
        <div className="kicker">THE TRANSLATOR · 翻译官</div>
        <div className="tf-code card">
          <div className="tf-code-head">
            <code>xuegecar_bringup</code>
            <span className="tf-code-role">订阅 /odom · 收到一条，广播一条 TF</span>
          </div>
          <hr className="rule" />
          <div className="tf-code-lines">
            <p className="tf-code-line" style={{ animationDelay: "0.8s" }}>
              {'create_subscription<Odometry>("odom", SensorDataQoS(), …)'}
              <i>// 订阅 /odom</i>
            </p>
            <p className="tf-code-line" style={{ animationDelay: "2.2s" }}>
              {'frame_id = "odom"'}
              <i>// 父坐标系</i>
            </p>
            <p className="tf-code-line" style={{ animationDelay: "3.4s" }}>
              {'child_frame_id = "base_footprint"'}
              <i>// 子坐标系</i>
            </p>
            <p className="tf-code-line" style={{ animationDelay: "4.6s" }}>
              tf_broadcaster_-&gt;sendTransform(transform)
              <i>// 广播 odom → base_footprint</i>
            </p>
          </div>
        </div>
        <span className="tf-rate" style={{ animationDelay: "6s" }}>
          主循环 <b className="hero-num">1000Hz</b> spin_some · 持续广播不停
        </span>
      </div>
    );
  }

  /* step 2 —— 为啥要这座桥 */
  if (step === 2) {
    return (
      <div key={step} className="tf-scene scene-pad">
        <div className="kicker">WHY · 为啥要这座桥</div>
        <div className="tf-asks">
          <span className="tf-ask" style={{ animationDelay: "0.5s" }}>
            <b>RViz</b> 画车 → 问「车在坐标系哪儿」
          </span>
          <span className="tf-ask" style={{ animationDelay: "1.7s" }}>
            <b>Nav2</b> 算路径 → 问「车在坐标系哪儿」
          </span>
        </div>
        <p className="tf-verdict" style={{ animationDelay: "3.2s" }}>
          它们问的不是「哪个话题发了啥」，
          <br />
          <code>TF</code> 才是<em>共同的语言</em>。
        </p>
      </div>
    );
  }

  /* step 3 —— 连桥 + 立牌 */
  return (
    <div key={step} className="tf-scene scene-pad tf-center">
      <div className="kicker">A BRIDGE · 话题世界 ↔ TF 世界</div>
      <div className="tf-bridge">
        <svg viewBox="0 0 1100 260" aria-hidden>
          <path d="M30 200 H240 M860 200 H1070" className="tf-bank" />
          <path d="M240 200 C 380 60, 720 60, 860 200" className="tf-bridge-arc" />
          <rect x="200" y="176" width="80" height="26" rx="6" className="tf-pillar" />
          <rect x="820" y="176" width="80" height="26" rx="6" className="tf-pillar" />
        </svg>
        <span className="tf-bridge-label tf-bridge-label-l">/odom 话题</span>
        <span className="tf-bridge-label tf-bridge-label-r">TF 坐标系</span>
      </div>
      <div className="tf-sign" style={{ animationDelay: "1.8s" }}>
        <em>路牌</em>第 12 章 · 细讲 TF
      </div>
    </div>
  );
}
