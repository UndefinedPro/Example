import type { ChapterStepProps } from "../../registry/types";
import "./HandsOn.css";

/**
 * 14 · hands-on（6 步）—— 动手验证：让小车画个圆
 * 安全准备 → echo /odom → teleop 遥控 → 画圆指令 → r=0.2m 思考题 → 全链路回放
 */
export default function HandsOn({ step }: ChapterStepProps) {
  /* step 0 —— 安全准备 */
  if (step === 0) {
    return (
      <div key={step} className="ho-scene scene-pad">
        <div className="kicker">HANDS ON · 动手之前，先说安全</div>
        <div className="ho-preps">
          <div className="ho-prep" style={{ animationDelay: "0.4s" }}>
            <svg viewBox="0 0 300 200" className="ho-prep-ico" aria-hidden>
              <rect x="70" y="60" width="160" height="62" rx="16" className="ho-car-body" />
              <rect x="52" y="78" width="26" height="24" rx="5" className="ho-car-wheel" />
              <rect x="222" y="78" width="26" height="24" rx="5" className="ho-car-wheel" />
              <path d="M60 148 H240" className="ho-ground" />
              <path d="M60 170 H240" className="ho-ground ho-ground-dash" />
            </svg>
            <b>支架架空 · 轮子悬空</b>
          </div>
          <div className="ho-prep" style={{ animationDelay: "1.6s" }}>
            <svg viewBox="0 0 300 200" className="ho-prep-ico" aria-hidden>
              <path d="M30 160 H270" className="ho-ground" />
              <path d="M70 160 C 100 120, 130 132, 150 118 S 210 118, 236 96" className="ho-open-path" />
              <circle cx="236" cy="96" r="9" className="ho-open-dot" />
            </svg>
            <b>或去空旷地面</b>
          </div>
          <div className="ho-prep" style={{ animationDelay: "2.8s" }}>
            <svg viewBox="0 0 300 200" className="ho-prep-ico" aria-hidden>
              <rect x="46" y="66" width="86" height="62" rx="10" className="ho-host" />
              <rect x="172" y="66" width="86" height="62" rx="10" className="ho-car-body" />
              <path d="M138 96 H166" className="ho-link" />
              <circle cx="236" cy="82" r="7" className="ho-lamp" />
              <circle cx="236" cy="82" r="7" className="ho-lamp ho-lamp-halo" />
            </svg>
            <b>micro-ROS agent 连好</b>
          </div>
        </div>
        <p className="ho-prep-note" style={{ animationDelay: "4s" }}>
          轮子马上要真转，别让它带着线跑路
        </p>
      </div>
    );
  }

  /* step 1 —— 验里程计：echo /odom */
  if (step === 1) {
    return (
      <div key={step} className="ho-scene scene-pad">
        <div className="kicker">CHECK 1 · 先验里程计</div>
        <div className="ho-term">
          <div className="ho-term-bar">
            <i />
            <i />
            <i />
          </div>
          <p className="ho-term-cmd">
            <span>$</span> {"ros2 topic echo /odom --field pose.pose.position"}
          </p>
          <div className="ho-term-out">
            <span className="ho-val-a">
              x: <b>0.412</b> y: <b>-0.087</b>
            </span>
            <span className="ho-val-b">
              x: <b>0.476</b> y: <b>-0.091</b>
            </span>
          </div>
        </div>
        <p className="ho-note" style={{ animationDelay: "3.6s" }}>
          只看 position 那栏 · <b>手推小车</b>，看 x、y 跟着变
        </p>
      </div>
    );
  }

  /* step 2 —— 遥控：teleop */
  if (step === 2) {
    return (
      <div key={step} className="ho-scene scene-pad">
        <div className="kicker">CHECK 2 · 再上遥控</div>
        <div className="ho-term">
          <div className="ho-term-bar">
            <i />
            <i />
            <i />
          </div>
          <p className="ho-term-cmd">
            <span>$</span> {"ros2 run teleop_twist_keyboard teleop_twist_keyboard"}
          </p>
        </div>
        <div className="ho-keys">
          <span className="ho-key" style={{ animationDelay: "1.6s" }}>
            <b className="hero-num">i</b>前进
          </span>
          <span className="ho-key" style={{ animationDelay: "2.8s" }}>
            <b className="hero-num">j</b>左转
          </span>
          <span className="ho-key" style={{ animationDelay: "4s" }}>
            <b className="hero-num">l</b>右转
          </span>
        </div>
        <p className="ho-note" style={{ animationDelay: "5.4s" }}>
          此刻你就是在<b>亲手发 /cmd_vel</b>
        </p>
      </div>
    );
  }

  /* step 3 —— 画圆 */
  if (step === 3) {
    return (
      <div key={step} className="ho-scene scene-pad">
        <div className="kicker">MAIN EVENT · 最后画圆</div>
        <div className="ho-circle-wrap">
          <div className="ho-circle-cmd">
            <div className="ho-term">
              <div className="ho-term-bar">
                <i />
                <i />
                <i />
              </div>
              <p className="ho-term-cmd ho-term-cmd-sm">
                <span>$</span>
                {"ros2 topic pub -r 10 /cmd_vel geometry_msgs/msg/Twist \"{linear: {x: 0.1}, angular: {z: 0.5}}\""}
              </p>
            </div>
            <div className="ho-circle-params" style={{ animationDelay: "1.4s" }}>
              <span>
                前进 <b className="hero-num">0.1</b> m/s
              </span>
              <span>
                旋转 <b className="hero-num">0.5</b> rad/s
              </span>
            </div>
          </div>
          <svg viewBox="0 0 360 360" className="ho-circle" aria-hidden>
            <circle cx="180" cy="180" r="130" className="ho-circle-path" />
            <g className="ho-orbit">
              <circle cx="180" cy="50" r="14" className="ho-orbit-car" />
              <path d="M180 50 l16 -8 m-16 8 16 8" className="ho-orbit-nose" />
            </g>
          </svg>
        </div>
        <p className="ho-note" style={{ animationDelay: "2.6s" }}>
          一直往前又一直拐，轨迹就是个<em>圆</em>
        </p>
      </div>
    );
  }

  /* step 4 —— 思考题：半径 */
  if (step === 4) {
    return (
      <div key={step} className="ho-scene scene-pad ho-center">
        <div className="kicker">THINK · 留个思考题</div>
        <h2 className="ho-rq">圆的半径多大？</h2>
        <div className="ho-math">
          <span className="ho-math-f">
            r = v / ω
          </span>
          <span className="ho-math-eq hero-num">=</span>
          <span className="ho-math-f">
            0.1 / 0.5
          </span>
          <span className="ho-math-eq hero-num">=</span>
          <span className="ho-math-r">
            <b className="hero-num">0.2</b>m
          </span>
        </div>
        <p className="ho-note" style={{ animationDelay: "2.8s" }}>
          <svg viewBox="0 0 44 44" className="ho-tape" aria-hidden>
            <rect x="4" y="10" width="20" height="24" rx="3" className="ho-tape-body" />
            <circle cx="14" cy="22" r="5" className="ho-tape-hub" />
            <path d="M24 22h12v8h-6" className="ho-tape-strip" />
          </svg>
          拿<em>实测</em>对一下
        </p>
      </div>
    );
  }

  /* step 5 —— 全链路回放 */
  return (
    <div key={step} className="ho-scene scene-pad ho-center">
      <div className="kicker">WHY IT MATTERS · 这个实验为啥值钱</div>
      <h2 className="ho-recap-head">一条指令，把全章串了一遍</h2>
      <div className="ho-recap">
        {[
          { name: "Twist", sub: "你发指令", d: "0.6s" },
          { name: "运动学", sub: "分速", d: "2s" },
          { name: "PID", sub: "执行", d: "3.4s" },
          { name: "odom", sub: "记账", d: "4.8s" },
        ].map((n) => (
          <span key={n.name} className="ho-recap-slot">
            <span className="ho-recap-node" style={{ animationDelay: n.d }}>
              <code>{n.name}</code>
              <em>{n.sub}</em>
            </span>
            <i className="ho-recap-link" style={{ animationDelay: n.d }} />
          </span>
        ))}
      </div>
    </div>
  );
}
