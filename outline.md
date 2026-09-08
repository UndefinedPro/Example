# Video Outline — 第 9 章 · 运动控制：/cmd_vel 如何变成轮子转动

> **主题**：`blueprint`（蓝图）—— 沿用全课程系列主题：深藏青底 + 青色强调 + IBM Plex Mono，工程图纸气质（与第 6 / 10 章同一视觉语言）
> **总时长**：约 10 分半（口播 ~3200 字（含技术词）÷ 4 字/秒；65 步 `(~Ts)` 实测累加 631s）
> **章节数**：16 章 / 65 步
> **定位**：零经验小白单章深讲 —— 每个设计讲「为什么 + 好处」

---

## 01-coldopen — 开场：轮子是怎么听懂的（3 steps · ~36s）

**信息池**：
- 引用：进入小车的"神经系统"，先解决最核心的问题——发一条速度指令，小车怎么让轮子转起来 —— 来源 article 引言 / L3
- 承接：上一章看相机画面，本章进入运动控制 —— 来源 article 引言 / L3
- 链路四层：Twist 消息 / 差速运动学公式 / 指令队列 / PID 闭环 —— 来源 article 本章导览 / L5-L11
- 口播修辞："轮子是怎么听懂的？没人碰过它一下" —— 来源 script.md coldopen（口播修辞，非 article 原句）

**开发计划**：

- step 1 (~11s) — 终端窗口发出 /cmd_vel（linear.x 0.2）+ 小车剪影开动，问句大字"轮子是怎么听懂的？"
- step 2 (~12s) — 链路四层卡依次亮起：Twist 消息 / 运动学公式 / 指令队列 / PID 闭环
- step 3 (~13s) — 片名卡：CH 09「运动控制：/cmd_vel 如何变成轮子转动」+ "神经系统" 副标

口播节选：
> 电脑上敲一行指令，linear.x 0.2 发出去，小车就往前跑。轮子是怎么听懂的？这中间隔着好几层，少任何一层，轮子都不转。

---

## 02-cmdvel-twist — /cmd_vel：油门加方向盘（4 steps · ~43s）

**信息池**：
- 结构：`geometry_msgs/Twist` 有 6 个分量，本车只用 2 个 —— 来源 article §1 / L15
- 定义：`linear.x` 前进速度（m/s），正数向前 —— 来源 article §1 / L17
- 定义：`angular.z` 绕竖直轴的旋转速度（rad/s），正数逆时针（左转）—— 来源 article §1 / L18
- 比喻：油门 = linear.x，方向盘 = angular.z；不会单独命令"左轮转多少右轮转多少"，那是底盘该干的事 —— 来源 article §1 / L20

**开发计划**：

- step 1 (~11s) — Twist 消息结构图：6 个分量格子，4 个灰置、2 个高亮（linear.x / angular.z）
- step 2 (~12s) — 两张定义卡：linear.x = m/s 正数向前；angular.z = rad/s 正数逆时针（左转箭头）
- step 3 (~7s) — 驾驶舱比喻图：油门踏板标 linear.x，方向盘标 angular.z
- step 4 (~13s) — 分层图：上层只说"跑多快、拐多急"，底盘图标接住"轮子的事"

口播节选：
> 消息类型叫 Twist，一个消息里塞了六个数，我们这台小车只用了俩。linear.x 就是油门，angular.z 就是方向盘。

---

## 03-diff-kinematics — 差速运动学：转速差的直觉（4 steps · ~41s）

**信息池**：
- 原理：小车两轮固定在左右两侧，靠转速差转弯 —— 来源 article §2 / L24
- 四情况：左轮慢→右转 / 左轮快→左转 / 两轮同速→直行 / 左右反转→原地转 —— 来源 article §2 / L31-L32
- 函数：源码 `motion_controller.cpp` 中的 `CalculateKinematics()` —— 来源 article §2 / L35
- 公式：`final_target_vel_[0] = (linear_x - angular_z * kLy) * kMmsToRpm`（左轮）、`final_target_vel_[1] = (linear_x + angular_z * kLy) * kMmsToRpm`（右轮）—— 来源 article §2 / L38-L39

**开发计划**：

- step 1 (~16s) — 小车俯视简图：两轮固定左右 + "转弯全靠转速差" 大字 + "差速运动学" 标签
- step 2 (~9s) — 四象限卡：左轮慢→右转 / 左轮快→左转 / 同速→直行 / 反转→原地转（各配转向箭头）
- step 3 (~6s) — 代码卡：函数名 CalculateKinematics 高亮，"核心就两行"
- step 4 (~10s) — 两行公式代码卡：final_target_vel_[0] / [1]，75 与 kMmsToRpm 着色

口播节选：
> 这台车俩轮子固定在左右两侧，转向全靠两边转速差。源码里就是个函数 CalculateKinematics，核心就两行。

---

## 04-kinematics-detail — 半轮距 75：公式的数字与单位（4 steps · ~45s）

**信息池**：
- 常量：`kLy = kTrackWidth / 2 = 75mm`（半轮距）；`kWheelDiameter = 65.0f`、`kTrackWidth = 150.0f` 定义在文件开头 —— 来源 article §2 / L42
- 几何含义：车体绕中心转 angular_z → 左右轮各产生 ±`angular_z × 75mm` 的线速度差 —— 来源 article §2 / L44
- 单位换算：期望线速度（mm/s）÷ 轮子周长 = 转速（RPM），交给速度环执行，`kMmsToRpm` 干这个活 —— 来源 article §2 / L45
- 论断：直行 / 拐弯 / 原地转全部由公式的加减表达 —— 来源 article §2 / L31-L32 + L38-L39 综合

**开发计划**：

- step 1 (~10s) — 常量表：kTrackWidth = 150mm、kWheelDiameter = 65mm、kLy = 75mm，"75 = 半轮距" 标注
- step 2 (~12s) — 几何示意：小车中心点 + 左右轮各 75mm 引线，标注 ±angular_z × 75mm 速度差
- step 3 (~13s) — 换算链：mm/s 线速度 → ÷ 轮子周长 → RPM，kMmsToRpm 徽标
- step 4 (~10s) — 三动作卡：直行 / 拐弯 / 原地转，收拢到"两个数的加减"一行公式上

口播节选：
> 那个 75 就是半轮距。车体绕中心转 angular_z，左右轮各产生正负 75 乘 angular_z 的速度差；再除以轮子周长换算成 RPM。

---

## 05-odom-inverse — 倒着算：里程计的来源（3 steps · ~30s）

**信息池**：
- 逆运算：`GetVelocity()` 从左右轮实测转速反推车体 `linear_x / angular_z` —— 来源 article §2 / L47
- 意义：里程计（`/odom` 话题）的来源 —— 来源 article §2 / L47
- 口播总结：正算 = 控制，反算 = 感知，一份数学干两份活 —— 来源 script.md odom-inverse（口播总结）

**开发计划**：

- step 1 (~9s) — 公式方向反转图：CalculateKinematics 正向（控制）vs GetVelocity 反向（感知）
- step 2 (~11s) — /odom 话题卡：轮速一圈圈攒出位置 x、y 与朝向 yaw 的积分示意
- step 3 (~10s) — 双面卡："一份数学干两份活"：正算控制 / 反算感知

口播节选：
> 这公式还能倒着用。GetVelocity，从左右轮实测转速反推车体速度。这就是里程计的来源，/odom 里的位置和朝向。

---

## 06-journey — 一条 cmd_vel 的完整旅程（3 steps · ~30s）

**信息池**：
- 全链路：ROS2 /cmd_vel → microros_task 收到 → 队列 `q_motion_cmd` → motion_task（20ms 周期）→ `robot.Drive(vx, wz)` → 运动学解算 → PID → PWM → 电机 —— 来源 article §3 / L51-L56
- 周期：motion_task 每 20ms 一轮（`vTaskDelay(pdMS_TO_TICKS(20))`），是运动控制的「总调度」 —— 来源 article §3.1 / L59-L61
- 闭环：同样 PWM 爬坡下坡转速不同，目标 100 RPM 实测 90 RPM 就加 PWM，每 20ms 修一次 —— 来源 article §3.2 / L69-L80
- 承接：micro-ROS 任务与队列机制上一章已拆过 —— 来源 script.md journey（衔接语境）

**开发计划**：

- step 1 (~8s) — 追踪视角开场：一条 /cmd_vel 指令包出现在电脑终端，"它要经过几站？"
- step 2 (~13s) — 路线图上半：/cmd_vel → microros_task → 队列 q_motion_cmd → motion_task（20ms）→ robot.Drive
- step 3 (~9s) — 路线图下半：运动学解算 → PID → PWM → 电机，轮子图标开转

口播节选：
> 电脑发 /cmd_vel，micro-ROS 任务收下，丢进队列 q_motion_cmd。motion_task 每 20 毫秒取一次，调 robot.Drive。四站走完，轮子开转。

---

## 07-motion-task-heartbeat — motion_task：20ms 心跳与收指令（4 steps · ~32s）

**信息池**：
- 文件与周期：`main/tasks/control/motion_task.cpp`，运动控制"总调度"，每 20ms 一轮（`vTaskDelay(pdMS_TO_TICKS(20))`）—— 来源 article §3.1 / L61
- 步骤 1：`xQueueReceive(q_motion_cmd, ...)` 取最新运动指令 —— 来源 article §3.1 / L63
- 模式表：`control_mode`：0=速度控制（`Drive`）、1=定点控制、2=相对位移控制、3/6=单轮/双轮直控 —— 来源 article §3.1 / L63
- 设计动机：安全检查与控制解耦由任务内固定顺序保证（急停先于控制执行，见 §08 章）—— 来源 article §3.1 / L63-L65 综合

**开发计划**：

- step 1 (~10s) — 文件卡：motion_task.cpp + 20ms 秒表 + "总调度" 标签
- step 2 (~4s) — 五件事清单骨架：五个空槽位出现
- step 3 (~7s) — 槽位 1 点亮：xQueueReceive(q_motion_cmd) 取最新指令
- step 4 (~11s) — control_mode 模式表：0 速度 / 1 定点 / 2 相对位移 / 3、6 单轮双轮直控

口播节选：
> motion_task 是运动控制的总调度，每 20 毫秒醒一次，vTaskDelay 20 就是心跳。第一件收指令，control_mode 区分好几种模式。

---

## 08-motion-task-loop — 每圈的另一半：参数、急停、循环、遥测（4 steps · ~43s）

**信息池**：
- 步骤 2：可从外部动态调速度环、位置环 PID 参数（第 17 章会用到）—— 来源 article §3.1 / L64
- 步骤 3：急停检查，`g_emergency_stop` 为真则 `robot.Stop()` —— 来源 article §3.1 / L65
- 步骤 4：`robot.Update(dt, imu_yaw_rad)`，把 IMU 偏航角喂给控制器 —— 来源 article §3.1 / L66
- 步骤 5：速度、里程、四元数打包进 `q_motion_state`，由 micro-ROS 任务发布成 `/odom` —— 来源 article §3.1 / L67
- 设计动机：急停排在干活前面，安全永远比运动优先 —— 来源 script.md motion-task-loop（设计动机）

**开发计划**：

- step 1 (~9s) — 槽位 2 点亮：PID 参数卡 + "第 17 章调参" 角标
- step 2 (~13s) — 槽位 3 点亮：急停开关 g_emergency_stop → robot.Stop，"安全优先" 大字
- step 3 (~8s) — 槽位 4 点亮：robot.Update(dt, imu_yaw_rad)，IMU 偏航角流入
- step 4 (~13s) — 槽位 5 点亮：遥测打包 q_motion_state → /odom，收发双队列并排"互不挡道"

口播节选：
> 第二件收 PID 参数，第 17 章调参会用到。第三件急停检查，安全永远比运动优先。第五件把速度、里程、四元数打包发布成 /odom。

---

## 09-encoder-odom — Update 上半场：读编码器与里程计（5 steps · ~52s）

**信息池**：
- 总览：`motion_controller.cpp` 的 `Update()`，注释清晰，每轮四件事 —— 来源 article §3.2 / L71-L76
- 读编码器：两次更新间脉冲差 → 每秒脉冲数 → RPM —— 来源 article §3.2 / L73
- 细节：`sign = {1, -1}`——右轮电机装反，读数取负 —— 来源 article §3.2 / L73
- 滤波：原始转速一阶低通滤波抹平毛刺，`kAlpha = 0.35` —— 来源 article §3.2 / L73
- 里程计：滤波后轮速积分出 x、y、yaw（标准二轮里程计公式），维护 `total_distance_` 总里程 —— 来源 article §3.2 / L74

**开发计划**：

- step 1 (~8s) — 代码注释卡：Update() 四件事总览（四个空槽）
- step 2 (~11s) — 槽位 1：编码器脉冲 → 每秒脉冲数 → RPM 换算链
- step 3 (~12s) — sign = {1, -1} 细节卡：右轮电机装反读数取负，"一行搞定，不拆车"
- step 4 (~11s) — 滤波曲线对比：毛刺原始转速 vs kAlpha 0.35 平滑后的曲线
- step 5 (~10s) — 槽位 2：轮速积分出 x、y、yaw + total_distance 里程表累加

口播节选：
> Update 每轮四件事。第一件读编码器，脉冲差换算 RPM；右轮电机装反了，sign 取负；低通滤波 kAlpha 0.35 抹平毛刺；第二件积分出里程。

---

## 10-loop-pwm — Update 下半场：外环、内环、死区补偿（3 steps · ~34s）

**信息池**：
- 外环：按控制模式计算"车体该跑多快"；速度模式下外环就是命令本身 —— 来源 article §3.2 / L75
- 内环：每个轮子做 PID（目标 RPM vs 实测 RPM），输出 PWM —— 来源 article §3.2 / L76
- 死区补偿：`ApplyDeadband()`——电机从静止启动需要最小 PWM（这里 150），PID 出力太小轮子不动，主动加一脚"油门" —— 来源 article §3.2 / L76
- 设计动机：死区补偿让小指令也能立刻起步，低速才听话 —— 来源 script.md loop-pwm（设计动机）

**开发计划**：

- step 1 (~10s) — 槽位 3：外环图，速度模式下"命令直接透传"
- step 2 (~8s) — 槽位 4：每个轮子一个 PID，目标 RPM vs 实测 RPM → PWM
- step 3 (~16s) — ApplyDeadband 卡：最小 PWM 150 门槛线 + "主动补一脚油门，小指令也能起步" 注脚

口播节选：
> 第三件外环，速度模式下外环就是命令本身。第四件每个轮子一个 PID 输出 PWM，再加一脚 ApplyDeadband：起步要最小 PWM 150，出力太小轮子根本不动。

---

## 11-why-closed-loop — 为啥不直接给 PWM（4 steps · ~37s）

**信息池**：
- 动机：同样的 PWM，爬坡和下坡轮子转速完全不同 → 必须闭环 —— 来源 article §3.3 / L80
- 闭环例子：目标 100 RPM，实测 90 RPM，就加大一点 PWM，每 20ms 修一次 —— 来源 article §3.3 / L80
- 参数：`kKp = 1.0f, kKi = 6.0f, kKd = 0.0f, kMaxPwm = 255.0f`，定义在 `motion_controller.cpp` 开头 —— 来源 article §3.3 / L85

**开发计划**：

- step 1 (~8s) — 问题大字："为啥不直接给 PWM？"
- step 2 (~8s) — 对比卡：同一 PWM 下平地 vs 爬坡的轮速差异（开环失效）
- step 3 (~12s) — 闭环示意：目标 100 RPM vs 实测 90 RPM，差 10 → 加 PWM，20ms 修正环
- step 4 (~9s) — 参数卡：kKp 1.0 / kKi 6.0 / kKd 0.0 / kMaxPwm 255

口播节选：
> 因为同样的 PWM，平地和爬坡转速完全不同。目标 100 RPM 实测 90，差 10 就加大一点 PWM，每 20 毫秒修一次。

---

## 12-pid-gains — P、I、D 三兄弟与两种模式（4 steps · ~39s）

**信息池**：
- P（比例）：误差越大出力越大——"差多少补多少" —— 来源 article §3.3 / L88
- I（积分）：误差累积，专治"长期差一点点"的稳态误差；这里 ki=6 比较大，说明电机低速阻力明显，主要靠 I 拉起来 —— 来源 article §3.3 / L89
- D（微分）：误差变化率，抑制超调；这里没用到（kD=0）—— 来源 article §3.3 / L90
- 组件：`pid_controller`（`components/pid_controller/`）支持增量式（`kIncremental`）/ 位置式（`kPositional`）；速度环用增量式（PWM 增量天然平滑），位置环用位置式 —— 来源 article §3.3 / L92

**开发计划**：

- step 1 (~6s) — P 卡：误差杆越长出力越大，"差多少补多少"
- step 2 (~13s) — I 卡：误差累积水桶图 + ki=6 旁注"低速阻力明显，靠 I 拉起"
- step 3 (~6s) — D 卡：超调曲线 + "本车未用 kD=0" 灰置章
- step 4 (~14s) — pid_controller 组件卡：增量式 vs 位置式双栏，速度环走增量式"PWM 增量天然平滑"

口播节选：
> P 是比例，差多少补多少；I 是积分，专治稳态误差，这台车 ki 给到 6 挺大；D 没用到。速度环用增量式，输出 PWM 增量，天然平滑。

---

## 13-odom-to-tf — 上位机：/odom 翻译成 TF（4 steps · ~47s）

**信息池**：
- 问题：固件发布的 `/odom`（`nav_msgs/Odometry`）只是话题，RViz 和 Nav2 需要 TF 坐标变换 —— 来源 article §4 / L96
- 翻译官：`xuegecar_bringup.cpp` 订阅 `odom`（`rclcpp::SensorDataQoS()`）—— 来源 article §4 / L99-L100
- 广播：`frame_id = "odom"`（父）、`child_frame_id = "base_footprint"`（子）、`tf_broadcaster_->sendTransform` —— 来源 article §4 / L102-L104
- 频率：主循环以 1000Hz `spin_some` + 广播 TF；话题世界与 TF 世界之间的桥，第 12 章细讲 TF —— 来源 article §4 / L107

**开发计划**：

- step 1 (~12s) — 断层图：话题世界（/odom）与 TF 世界（RViz / Nav2）之间有一道沟
- step 2 (~15s) — 翻译官卡：xuegecar_bringup 订阅 /odom → 广播 TF odom → base_footprint，1000Hz spin_some
- step 3 (~12s) — 动机卡：RViz 画车、Nav2 算路径问的都是"车在坐标系哪儿"，TF = 共同语言
- step 4 (~8s) — 桥梁图：话题世界与 TF 世界连桥 + "第 12 章细讲 TF" 立牌

口播节选：
> 固件发的 /odom 只是个话题，可 RViz 和 Nav2 认的是 TF。翻译官是 xuegecar_bringup：收到一条就广播一条 TF，odom 到 base_footprint，1000 赫兹不停。

---

## 14-hands-on — 动手验证：让小车画个圆（6 steps · ~54s）

**信息池**：
- 安全准备：小车放支架（轮子悬空）或空旷地面，连接 micro-ROS agent —— 来源 article §5 / L111
- 里程计验证：`ros2 topic echo /odom --field pose.pose.position`，推车观察 x/y 变化 —— 来源 article §5 / L112
- 键盘遥控：`ros2 run teleop_twist_keyboard teleop_twist_keyboard`，按 i/j/l 走、转 —— 来源 article §5 / L113
- 画圆指令：`ros2 topic pub -r 10 /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.1}, angular: {z: 0.5}}"`（前进 + 旋转的合成就是圆弧）—— 来源 article §5 / L116-L118
- 思考题：r = v / ω = 0.1 / 0.5 = 0.2m，与实测对照 —— 来源 article §5 / L119
- 口播总结：一条指令串起全章——Twist 进，运动学分速，PID 执行，odom 记账 —— 来源 script.md hands-on（口播总结）

**开发计划**：

- step 1 (~9s) — 安全准备卡：支架悬空小车 + 空旷地面图标 + agent 连接状态灯
- step 2 (~8s) — 终端：ros2 topic echo /odom（position 栏）+ 手推小车 x、y 数字跳动
- step 3 (~9s) — 终端：teleop_twist_keyboard 键位图 i / j / l，标注"你在亲手发 /cmd_vel"
- step 4 (~9s) — 画圆指令卡：pub 0.1 m/s + 0.5 rad/s → 小车轨迹画出圆弧
- step 5 (~9s) — 思考题卡：r = v / ω = 0.1 / 0.5 = 0.2m，卷尺图标"拿实测对一下"
- step 6 (~10s) — 全链路回放条：Twist → 运动学 → PID → odom 四站连成一线

口播节选：
> 先架空或去空旷地。echo /odom 手推小车看坐标，teleop 遥控 i/j/l。最后发布前进 0.1、旋转 0.5，小车画圆，半径 r = 0.1 除以 0.5，0.2 米。

---

## 15-faq — 卡住了对号入座（4 steps · ~35s）

**信息池**：
- Q1：发 cmd_vel 没反应 → 检查 micro-ROS agent 是否连上（第 6 章）、Web 配置页是否切到 micro-ROS 模式 —— 来源 article §6 / L123
- Q2：小车走不直 → 左右轮 PID 特性差异或死区不对称，微调 `kDeadband` 或通过 PID 指令在线调试 —— 来源 article §6 / L124
- Q3：/odom 漂移 → 轮式里程计天然会漂（打滑），这正是 Nav2 还要融合 IMU/激光做定位的原因（第 15 章）—— 来源 article §6 / L125

**开发计划**：

- step 1 (~4s) — 三问题索引卡：三个问号槽位
- step 2 (~10s) — Q1 卡：cmd_vel 没反应 → 两个检查项逐个亮（agent 连接 / Web 模式切换）
- step 3 (~10s) — Q2 卡：走不直 → kDeadband 微调 + PID 在线调试两处方
- step 4 (~11s) — Q3 卡：odom 漂移（打滑）→ "Nav2 融合 IMU/激光" 药方 + 第 15 章角标

口播节选：
> 发 cmd_vel 没反应，查 agent 和 Web 模式；走不直，调 kDeadband 或在线调 PID；odom 漂移是轮式里程计的天性，Nav2 还要融合 IMU 和激光。

---

## 16-wrap-up — 四件事 + 下期预告（6 steps · ~33s）

**信息池**：
- 要点 1：cmd_vel 只有油门（linear.x）+ 方向盘（angular.z），轮子分配归底盘 —— 来源 article §1 / L15-L20
- 要点 2：差速运动学一行公式，转速差合成前进 + 转弯 —— 来源 article §2 / L38-L39
- 要点 3：固件 20ms 一拍：编码器、里程计、外环内环、死区补偿 —— 来源 article §3.2 / L73-L76
- 要点 4：PID 闭环让轮速贴合目标，稳态误差靠 I —— 来源 article §3.3 / L80 + L89
- 预告：下一章继续拆传感器——IMU、电池、超声波三件套的固件源码 —— 来源 article / L127

**开发计划**：

- step 1 (~3s) — 收束大字："四件事"
- step 2 (~5s) — 要点 1/4 卡：cmd_vel = 油门 + 方向盘
- step 3 (~6s) — 要点 2/4 卡：一行差速公式（已念过的卡灰化保留）
- step 4 (~6s) — 要点 3/4 卡：20ms 四步控制循环
- step 5 (~5s) — 要点 4/4 卡：PID 说到做到（四卡全亮）
- step 6 (~8s) — 下期预告屏：第 10 章传感器三件套（IMU / 电池 / 超声波）+ "下期见"

口播节选：
> 收个尾，四件事：油门加方向盘；一行差速公式；20 毫秒四步循环；PID 说到做到。下一章拆传感器三件套，下期见。

---

## 素材清单

> 本视频无外部图片素材，全部视觉元素用 CSS / SVG / Canvas 现场绘制；代码片段、命令、
> 常量数值全部取自 `article.md` 原文（无虚构 API）。⚠️ 项 = 可选增强，缺了不影响成片。

### 1. coldopen
- ✓ 终端发 /cmd_vel 指令文本（article §5 / L116 样式）
- ✓ 小车剪影 + 问句大字（SVG 自绘）
- ⚠️ 小车实物照片（可从 `01-panorama/screenshots/` 等章节目录补，非必需）

### 2. cmdvel-twist
- ✓ Twist 六分量结构与两个在用分量定义（article §1 / L15-L18）
- ✓ 油门 / 方向盘比喻卡（article §1 / L20）

### 3. diff-kinematics
- ✓ `CalculateKinematics()` 两行公式源码（article §2 / L38-L39）
- ✓ 四种转向情况（article §2 / L31-L32）

### 4. kinematics-detail
- ✓ 常量 150mm / 65mm / 75mm（article §2 / L42）
- ✓ mm/s → RPM 换算说明（article §2 / L45）

### 5. odom-inverse
- ✓ `GetVelocity()` 逆运算与 /odom 说明（article §2 / L47）

### 6. journey
- ✓ 全链路流程图（article §3 / L51-L56）

### 7. motion-task-heartbeat
- ✓ motion_task 20ms 周期与五件事清单（article §3.1 / L61-L63）
- ✓ control_mode 模式表（article §3.1 / L63）

### 8. motion-task-loop
- ✓ 急停 / Update / 遥测三步（article §3.1 / L64-L67）
- ✓ `q_motion_state` → `/odom` 链路（article §3.1 / L67）

### 9. encoder-odom
- ✓ 编码器脉冲 → RPM 链、sign = {1,-1}、kAlpha 0.35（article §3.2 / L73）
- ✓ 里程计积分 + total_distance_（article §3.2 / L74）

### 10. loop-pwm
- ✓ 外环 / 内环职责（article §3.2 / L75-L76）
- ✓ `ApplyDeadband()` 最小 PWM 150（article §3.2 / L76）

### 11. why-closed-loop
- ✓ 100 vs 90 RPM 闭环例子（article §3.3 / L80）
- ✓ PID 四常量（article §3.3 / L85）

### 12. pid-gains
- ✓ P / I / D 三条论断（article §3.3 / L88-L90）
- ✓ 增量式 / 位置式说明（article §3.3 / L92）

### 13. odom-to-tf
- ✓ bringup 订阅与 TF 广播代码（article §4 / L99-L104）
- ✓ 1000Hz spin_some（article §4 / L107）

### 14. hands-on
- ✓ 三条验证命令 + 画圆命令（article §5 / L111-L118）
- ✓ r = 0.2m 思考题（article §5 / L119）

### 15. faq
- ✓ 三问三答（article §6 / L123-L125）

### 16. wrap-up
- ✓ 四要点卡（各章结论回 article 对应节）
- ✓ 第 10 章预告标签（article / L127）

---

## 自检记录

**script.md 三层自检（SCRIPT-STYLE.md）**：
- [x] 形式层：信息保留度达标（口播有效文本 ~3200 字 vs article 有效正文 ~2700 字，≥60%，关键数字 / 案例 / 论证链逐项对照无整段消失）；无 emoji / 书名号 / 括号补充（标题引用块除外）；句子短句化；第二人称；开头 3 秒钩子（"轮子是怎么听懂的"）；核心数字保留原值（75 / 150 / 65 / 0.35 / 150 / 255 / 20ms / 1000Hz / 0.2m 等）；无"首先 / 其次 / 最后"结构词堆砌；例子具体
- [x] 风骨层：无"说白了 / 本质上 / 底层逻辑 / 恰恰 / 反而 / 正是 / 归根结底 / 换句话说"AI 高频词（grep 全文 0 命中）；开头非假共情；无自我加权句；无 ≥3 句纯修辞排比（四转向情况 / 四件事为原文事实清单）；结尾为具体预告 + "下期见"
- [x] 念出来层：全稿按口播节奏写，挑 coldopen / deadband / 画圆三段试念无"说不出口"句

**outline.md 自检（OUTLINE-FORMAT.md）**：
- [x] 每个 step 单一句屏幕内容描述，无动画行 / 手段行
- [x] 无具体毫秒 / 错峰量（除 `(~Ts)` 口播估时）
- [x] 每章首段有信息池（≥3 条），每条带来源标注（article §X / Lxx）
- [x] 各章 step `(~Ts)` 累加 631s ≈ 顶部声明 ~10 分半（631s，误差 < 10%）
- [x] 章节切分：16 章均在 3~8 步区间，每章一个聚焦主题，时长 30~54s（除 06-journey ~30s 边界值）
- [x] 素材清单分章标注 ✓ / ⚠️
- [x] script.md 仅含口播内容（标题 / 说明在引用块与章节标题，不进口播）
- [x] script.md 节拍数 = outline 总步数 = 65
