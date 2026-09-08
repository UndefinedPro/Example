# 第 9 章 运动控制：/cmd_vel 如何变成轮子转动

> 上一章我们看到了相机画面。从这一章开始，我们进入小车的"神经系统"——先解决最核心的问题：**ROS2 里发一条速度指令，小车是怎么让轮子转起来的？**

## 本章导览

- `/cmd_vel` 消息里到底装了什么
- 差速运动学：两个轮子如何合成"前进+转弯"
- 固件源码拆解：`motion_controller.cpp` 的四步控制流程
- PID：让轮子"说到做到"
- 动手验证：让小车画一个圆

## 1. /cmd_vel：一条"速度指令"

`geometry_msgs/Twist` 有 6 个分量，我们的小车只用两个：

- `linear.x`：前进速度（m/s），正数向前
- `angular.z`：绕竖直轴的旋转速度（rad/s），正数逆时针（左转）

理解它最好的比喻：**开车时油门（linear.x）+ 方向盘（angular.z）**。你不会单独命令"左轮转多少右轮转多少"——那是底盘该干的事。

## 2. 差速运动学：一个公式走天下

小车两轮固定在左右两侧，靠**转速差**转弯：

```
        ↑ 前进方向
   ┌─────────┐
   │轮L    轮R│   轮距 L = 150mm
   └─────────┘
   左轮慢 → 右转      左轮快 → 左转
   两轮同速 → 直行    左右反转 → 原地转
```

对应源码 `软件/1.源码/leap_low_v1/main/control/motion_controller.cpp` 中的 `CalculateKinematics()`：

```cpp
final_target_vel_[0] = (linear_x - angular_z * kLy) * kMmsToRpm;  // 左轮
final_target_vel_[1] = (linear_x + angular_z * kLy) * kMmsToRpm;  // 右轮
```

其中 `kLy = kTrackWidth / 2 = 75mm`（半轮距，常量定义见文件开头 `kWheelDiameter = 65.0f`、`kTrackWidth = 150.0f`）。这个公式的含义：

- 车体要"绕中心转 angular_z"，左右轮就会各产生 ±`angular_z × 75mm` 的线速度差
- 把"期望线速度（mm/s）"除以轮子周长换算成"转速（RPM）"，交给速度环去执行——`kMmsToRpm` 就是干这个的

反过来也有逆运算 `GetVelocity()`：从左右轮实测转速反推车体 `linear_x / angular_z`，这就是**里程计**的来源（`/odom` 话题）。

## 3. 固件源码：一条 cmd_vel 的完整旅程

```
ROS2 /cmd_vel ──► microros_task 收到 ──► 队列 q_motion_cmd
                                              │
motion_task（20ms 周期）──► robot.Drive(vx, wz)
                                              │
motion_controller：运动学解算 → PID → PWM → 电机
```

### 3.1 motion_task：20ms 的心跳

`main/tasks/control/motion_task.cpp` 是运动控制的"总调度"，每 20ms 执行一轮（`vTaskDelay(pdMS_TO_TICKS(20))`），步骤清晰：

1. **收指令**：`xQueueReceive(q_motion_cmd, ...)` 取最新运动指令。`control_mode` 区分多种模式：0=速度控制（`Drive`）、1=定点控制、2=相对位移控制、3/6=单轮/双轮直控
2. **收 PID 参数**：可以从外部动态调速度环、位置环参数（第 17 章会用到）
3. **急停检查**：`g_emergency_stop` 为真则 `robot.Stop()`
4. **执行控制循环**：`robot.Update(dt, imu_yaw_rad)`——把 IMU 的偏航角喂给控制器
5. **上报遥测**：把速度、里程、四元数打包进 `q_motion_state` 队列，由 micro-ROS 任务发布成 `/odom`

### 3.2 Update()：每一轮 20ms 干的四件事

打开 `motion_controller.cpp` 的 `Update()`，注释已经写得很清楚：

1. **读编码器**：两次更新间的脉冲差 → 每秒脉冲数 → RPM。注意 `sign = {1, -1}`——右轮电机装反了，读数取负。原始转速用一阶低通滤波（`kAlpha = 0.35`）抹平毛刺
2. **里程计更新**：用滤波后的轮速积分出 x、y、yaw（标准二轮里程计公式）。同时维护 `total_distance_`（总里程）
3. **外环控制**：根据控制模式计算"车体该跑多快"（速度模式下外环就是命令本身）
4. **内环 PID + 发 PWM**：对每个轮子做 PID（目标 RPM vs 实测 RPM），输出 PWM，再加一个 `ApplyDeadband()`——**死区补偿**：电机从静止启动需要最小 PWM（这里 150），PID 出力太小轮子根本不动，所以主动加一脚"油门"

### 3.3 PID：让轮子说到做到

为什么不能直接给 PWM？因为**同样的 PWM，爬坡和下坡轮子转速完全不同**。所以要闭环：目标 100 RPM，实测 90 RPM，就加大一点 PWM，每 20ms 修一次。

PID 参数定义在 `motion_controller.cpp` 开头：

```cpp
static const float kKp = 1.0f, kKi = 6.0f, kKd = 0.0f, kMaxPwm = 255.0f;
```

- **P（比例）**：误差越大出力越大——"差多少补多少"
- **I（积分）**：误差累积——专治"长期差一点点"的稳态误差（这里 ki=6 比较大，说明这台小车的电机低速阻力明显，主要靠 I 拉起来）
- **D（微分）**：误差变化率，抑制超调（这里没用到）

`pid_controller` 组件（`components/pid_controller/`）还支持增量式（`kIncremental`）和位置式（`kPositional`）两种模式：速度环用增量式（输出的是 PWM 增量，天然平滑），位置环用位置式。

## 4. 上位机侧：/odom 回来变成 TF

固件发布的 `/odom`（`nav_msgs/Odometry`）只是个话题，RViz 和 Nav2 需要的是 **TF 坐标变换**。翻译工作由 `软件/1.源码/xuegeros_ws/src/xuegecar_bringup/src/xuegecar_bringup.cpp` 完成：

```cpp
odom_subscribe_ = this->create_subscription<nav_msgs::msg::Odometry>(
    "odom", rclcpp::SensorDataQoS(), ...);   // 订阅 /odom
...
transform.header.frame_id = "odom";           // 父坐标系
transform.child_frame_id = "base_footprint";  // 子坐标系
tf_broadcaster_->sendTransform(transform);    // 广播 odom → base_footprint
```

主循环以 1000Hz `spin_some` + 广播 TF，把话题数据持续翻译成坐标系关系。这就是"话题世界"和"TF 世界"之间的桥（第 12 章细讲 TF）。

## 5. 动手验证

1. 小车放到支架上（轮子悬空）或空旷地面，连接好 micro-ROS agent
2. `ros2 topic echo /odom --field pose.pose.position` —— 推动小车，观察 x/y 变化
3. 键盘遥控：`ros2 run teleop_twist_keyboard teleop_twist_keyboard`，按 i/j/l 让小车走、转
4. **画圆实验**：发布固定指令（前进 + 旋转的合成就是圆弧）：
   ```bash
   ros2 topic pub -r 10 /cmd_vel geometry_msgs/msg/Twist \
     "{linear: {x: 0.1}, angular: {z: 0.5}}"
   ```
   观察小车轨迹是不是圆——再想想：圆的半径大约是多少？（提示：r = v / ω = 0.1 / 0.5 = 0.2m，和你的实测对一下）

## 6. 常见问题

- **发 cmd_vel 没反应**：检查 micro-ROS agent 是否连上（第 6 章）、是否在 Web 配置页切换到了 micro-ROS 模式
- **小车走不直**：左右轮 PID 特性差异或死区不对称，可微调 `kDeadband` 或通过 PID 指令在线调试
- ** odom 漂移**：轮式里程计天然会漂（打滑），这正是后面 Nav2 还要融合 IMU/激光做定位的原因（第 15 章）

> 下一章：继续拆传感器——IMU、电池、超声波三件套的固件源码。
