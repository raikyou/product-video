  技术架构概述

  项目配置:
  - 视频尺寸: 1920x1080
  - 帧率: 30 fps
  - 总时长: 2520 帧 (84 秒)
  - Remotion 版本: 最新稳定版
  - 转场方式: TransitionSeries

  ---
  场景 1: 痛点引入 - 总部资源崩溃

  时间范围: 第 0 帧到第 240 帧 (共 240 帧, 约 8 秒)

  视觉目标
  左侧显示中国地图,标注总部(北京)和多个分支机构位置。右侧显示总部服务器,多条红色连接线从各地快速涌入,服务器图标闪烁红光
  并出现"冒烟"效果。底部浮现延迟和资源占用数据。配音:"全国分支机构都连总部开会,服务器撑不住了!"

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 0 帧开始,持续 240 帧
  布局: 左右分屏 (50% + 50%)
  2. 动画效果

    - 中国地图:
        - 使用 SVG 绘制简化版中国轮廓
      - 标注 6 个城市位置(北京、上海、广州、成都、深圳、杭州)
      - 使用 spring() 实现城市标记从无到有的弹出效果
      - 参数建议: damping: 100, stiffness: 200
      - 动画时间: 0-60 帧
    - 连接线动画:
        - 使用 SVG <path> 绘制曲线连接线
      - 通过 strokeDashoffset 实现线条生长动画
      - 使用 interpolate(frame, [60, 120], [lineLength, 0]) 控制
      - 颜色: 从橙色 #FF6B35 渐变到红色 #F7131C
      - 6 条线按顺序出现,每条延迟 5 帧
    - 服务器图标:
        - 使用 React Icons FaServer (size: 120px)
      - 背景使用 spring() 实现脉冲效果
      - 红色光晕: box-shadow 从小到大
      - 参数: damping: 50 (低阻尼实现持续震动)
    - 警告数据文字:
        - "500ms 延迟"、"资源占用 95%"、"排队中..."
      - 使用 interpolate() 实现淡入 + 向上滑动
      - 从第 150 帧开始,持续 30 帧
      - 数字使用滚动计数器效果 (0→500ms)
  3. UI 元素与素材方案
    - 背景: 深蓝色渐变 linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)
    - 文字: "全国分支机构都连总部开会,服务器撑不住了!"
        - 字体: Noto Sans SC Bold, 48px, 白色
      - 位置: 顶部居中,距顶部 60px
      - 淡入时间: 30-60 帧
    - 视觉素材:
        - 方案 A (首选): 使用代码生成 SVG 中国地图 + React Icons
      - 方案 B (备选): 如果 Figma 有地图设计,导出为 SVG
  4. 转场设计
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: 20 })}
  />
  5. 代码示例结构
  <Sequence from={0} durationInFrames={240}>
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
    }}>
      {/* 标题 */}
      <div style={{
        position: 'absolute',
        top: 60,
        width: '100%',
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        opacity: interpolate(frame, [30, 60], [0, 1])
      }}>
        全国分支机构都连总部开会,服务器撑不住了!
      </div>

      {/* 左侧地图 */}
      <div style={{ position: 'absolute', left: 0, width: '50%', height: '100%' }}>
        <ChinaMapSVG />
        {cities.map((city, i) => (
          <CityMarker
            key={city.name}
            {...city}
            scale={spring({
              frame: frame - (i * 5),
              fps,
              config: { damping: 100, stiffness: 200 }
            })}
          />
        ))}
      </div>

      {/* 右侧服务器 */}
      <div style={{ position: 'absolute', right: '25%', top: '40%' }}>
        <FaServer
          size={120}
          color="#F7131C"
          style={{
            filter: `drop-shadow(0 0 ${spring({...})} * 30}px #F7131C)`,
            animation: 'shake 0.5s infinite'
          }}
        />
      </div>

      {/* 警告数据 */}
      <WarningStats frame={frame} />
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 中国地图 SVG: 用代码生成简化版轮廓
  - 服务器图标: React Icons FaServer
  - 连接线: SVG <path> 代码生成
  - 字体: Noto Sans SC (Google Fonts)

  ---
  场景 2: 痛点具象化 - 四大灾难

  时间范围: 第 260 帧到第 560 帧 (共 300 帧, 约 10 秒)

  视觉目标
  屏幕分为 2x2 四宫格,每个格子展示一个具体问题场景。依次展示:视频卡顿、VIP
  会议资源不足、员工打电话催运维、找不到录制文件。每个格子带有图标和数据标签。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 260 帧开始,持续 300 帧
  布局: CSS Grid 2x2
  2. 动画效果

    - 四宫格入场:
        - 使用 spring() 实现每个格子从中心缩放弹出
      - 按顺序出现:左上(frame 0-30) → 右上(frame 30-60) → 左下(frame 60-90) → 右下(frame 90-120)
      - 参数: damping: 80, stiffness: 150
    - 格子 1 - 视频卡顿:
        - 背景: 深灰色 #2C2C2C
      - 图标: FaVideo (红色, 80px)
      - 延迟数字: "300ms → 500ms → 800ms" 动态跳动
      - 使用 interpolate() + 阶梯函数实现数字跳跃
    - 格子 2 - VIP 会议:
        - 背景: 暗红色 #4A1F1F
      - 图标: FaUserTie (金色, 80px)
      - 文字: "资源不足" (红色闪烁)
      - 闪烁效果: opacity 在 0.3-1 之间来回
    - 格子 3 - 打电话催运维:
        - 背景: 深蓝色 #1F2A4A
      - 图标: FaPhoneAlt (橙色, 80px) + 震动动画
      - 电话铃声波纹: 同心圆扩散效果
    - 格子 4 - 找不到文件:
        - 背景: 深紫色 #2A1F4A
      - 图标: FaFolderOpen (灰色, 80px)
      - 搜索框: 输入"录制文件" + 红色 "X" 出现
  3. UI 元素与素材方案
    - 背景: 纯黑色 #000000
    - 标题文字: "视频卡顿、领导会议被挤、录制文件到处找、天天催总部运维..."
        - 字体: Noto Sans SC, 40px, 白色
      - 位置: 底部居中,距底部 80px
      - 淡入时间: 200-230 帧
    - 视觉素材:
        - 方案 A (首选): React Icons + 代码生成 UI 元素
      - 方案 B (备选): 如果 Figma 有场景插图,导出使用
  4. 代码示例结构
  <Sequence from={260} durationInFrames={300}>
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 20,
        padding: 100
      }}>
        {[
          { icon: FaVideo, label: '视频卡顿', delay: 300ms', index: 0 },
          { icon: FaUserTie, label: 'VIP 资源不足', index: 1 },
          { icon: FaPhoneAlt, label: '催运维', index: 2 },
          { icon: FaFolderOpen, label: '找不到文件', index: 3 }
        ].map((item, i) => (
          <GridCell
            key={i}
            {...item}
            scale={spring({
              frame: frame - (i * 30),
              fps,
              config: { damping: 80, stiffness: 150 }
            })}
          />
        ))}
      </div>

      {/* 底部标题 */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        width: '100%',
        textAlign: 'center',
        fontSize: 40,
        color: '#fff',
        opacity: interpolate(frame, [200, 230], [0, 1])
      }}>
        视频卡顿、领导会议被挤、录制文件到处找、天天催总部运维...
      </div>
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 图标: React Icons (FaVideo, FaUserTie, FaPhoneAlt, FaFolderOpen)
  - UI 元素: 代码生成
  - 可选插图: Figma 导出 (如果有)

  ---
  场景 3: 解决方案登场

  时间范围: 第 580 帧到第 760 帧 (共 180 帧, 约 6 秒)

  视觉目标
  从黑色背景中心出现光效,标题"站点管理系统"从中心放大展开。背景浮现清晰的网络拓扑图,显示总部和各分支都有独立的服务器节
  点。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 580 帧开始,持续 180 帧
  2. 动画效果

    - 光效爆发:
        - 中心点白色光晕,使用 radial-gradient
      - 光晕半径使用 spring() 从 0 扩散到 800px
      - 参数: damping: 60, stiffness: 100
      - 动画时间: 0-60 帧
    - 标题入场:
        - "站点管理系统" 使用 spring() 实现缩放
      - 从 scale(0) 到 scale(1)
      - 参数: damping: 100, stiffness: 150
      - 同时淡入: opacity 从 0 到 1
      - 动画时间: 30-90 帧
    - 网络拓扑图:
        - 使用 SVG 绘制节点和连接线
      - 节点: 圆形 + 服务器图标
      - 连接线: 绿色虚线,使用 strokeDashoffset 动画
      - 节点按顺序出现: 60-180 帧
  3. UI 元素与素材方案
    - 背景: 从黑色渐变到深蓝色
    background: `radial-gradient(circle at center,
    rgba(255,255,255,${interpolate(frame, [0, 60], [0, 0.1])}) 0%,
    #0F1419 50%)`
    - 标题: "站点管理系统"
        - 字体: Noto Sans SC Bold, 96px, 白色
      - 位置: 垂直水平居中
    - 副标题: "让每个地区都有自己的资源"
        - 字体: Noto Sans SC, 36px, 浅灰色 #A0A0A0
      - 淡入时间: 90-120 帧
    - 视觉素材:
        - 方案 A (首选): 代码生成 SVG 网络拓扑图
      - 方案 B (备选): Figma node-id=1-10731 主界面模糊背景
  4. 代码示例结构
  <Sequence from={580} durationInFrames={180}>
    <AbsoluteFill style={{
      background: `radial-gradient(circle at center,
        rgba(255,255,255,${interpolate(frame, [0, 60], [0, 0.1])}) 0%,
        #0F1419 50%)`
    }}>
      {/* 光效 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: spring({ frame, fps, config: { damping: 60 } }) * 800,
        height: spring({ frame, fps, config: { damping: 60 } }) * 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
        filter: 'blur(40px)'
      }} />

      {/* 标题 */}
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
      }}>
        <h1 style={{
          fontSize: 96,
          fontWeight: 'bold',
          color: '#fff',
          transform: `scale(${spring({
            frame: frame - 30,
            fps,
            config: { damping: 100, stiffness: 150 }
          })})`,
          opacity: interpolate(frame, [30, 90], [0, 1])
        }}>
          站点管理系统
        </h1>
        <p style={{
          fontSize: 36,
          color: '#A0A0A0',
          opacity: interpolate(frame, [90, 120], [0, 1])
        }}>
          让每个地区都有自己的资源
        </p>
      </AbsoluteFill>

      {/* 背景网络拓扑 */}
      <NetworkTopology frame={frame - 60} />
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 网络拓扑图: SVG 代码生成
  - 光效: CSS radial-gradient
  - 可选背景: Figma 主界面截图 (模糊处理)

  ---
  场景 4: 核心能力 1 - 就近接入

  时间范围: 第 780 帧到第 1140 帧 (共 360 帧, 约 12 秒)

  视觉目标
  展示站点列表界面,显示多个城市站点。动画演示上海员工自动连接到上海站点,延迟数字从 500ms 快速降到
  20ms,服务器负载同步下降。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 780 帧开始,持续 360 帧
  布局: 左侧站点列表(40%) + 右侧可视化演示(60%)
  2. 动画效果

    - 站点列表表格:
        - 使用 Figma 导出的截图或代码生成表格
      - 表格行依次淡入: 每行延迟 10 帧
      - 上海站点行高亮: 背景色变为蓝色 #1E90FF
    - 用户头像 → 站点连接动画:
        - 用户头像(圆形 + FaUser 图标)从左侧飞入
      - 使用 spring() 实现弹性移动
      - 连接线生长: SVG path + strokeDashoffset
      - 到达上海站点后,绿色 "✓" 出现
    - 延迟数字滚动:
        - 从 "500ms" 滚动到 "20ms"
      - 使用 interpolate() + Math.floor() 实现
      - 时间: 150-210 帧
      - 数字颜色: 红色 → 绿色渐变
    - 负载百分比动画:
        - 进度条从 95% 降到 30%
      - 使用 interpolate() 控制宽度
      - 颜色: 红色 → 绿色
  3. UI 元素与素材方案
    - 背景: 浅灰色 #F5F5F5
    - 标题: "按 IP 地址就近接入,上海开会用上海资源,延迟从 500 降到 20 毫秒"
        - 字体: Noto Sans SC, 32px, 深灰色 #333
      - 位置: 顶部,距顶部 40px
    - 视觉素材:
        - 方案 A (首选): Figma node-id=1-10731 站点列表截图
      - 方案 B (备选): 代码生成 HTML 表格 + Tailwind 样式
  4. 代码示例结构
  <Sequence from={780} durationInFrames={360}>
    <AbsoluteFill style={{ backgroundColor: '#F5F5F5' }}>
      {/* 标题 */}
      <div style={{ padding: 40, fontSize: 32, color: '#333' }}>
        按 IP 地址就近接入,上海开会用上海资源,延迟从 500 降到 20 毫秒
      </div>

      <div style={{ display: 'flex', gap: 40, padding: 40 }}>
        {/* 左侧列表 */}
        <div style={{ flex: '0 0 40%' }}>
          <SiteListTable frame={frame} />
        </div>

        {/* 右侧演示 */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* 用户头像 */}
          <UserAvatar
            position={{
              x: interpolate(frame, [60, 120], [-100, 400]),
              y: 200
            }}
            scale={spring({
              frame: frame - 60,
              fps,
              config: { damping: 80 }
            })}
          />

          {/* 上海站点 */}
          <SiteNode city="上海" x={700} y={200} />

          {/* 连接线 */}
          <ConnectionLine
            from={{ x: 400, y: 200 }}
            to={{ x: 700, y: 200 }}
            progress={interpolate(frame, [120, 180], [0, 1])}
          />

          {/* 延迟指示器 */}
          <LatencyIndicator
            value={Math.floor(interpolate(frame, [150, 210], [500, 20]))}
            color={interpolate(frame, [150, 210], [0, 1]) > 0.5 ? '#00C853' : '#F7131C'}
          />
        </div>
      </div>
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 站点列表截图: Figma node-id=1-10731
  - 备选方案: 代码生成表格
  - 图标: React Icons (FaUser, FaServer, FaCheckCircle)

  ---
  场景 5: 核心能力 2 - 会议隔离

  时间范围: 第 1160 帧到第 1520 帧 (共 360 帧, 约 12 秒)

  视觉目标
  展示接入规则配置界面,左右分屏对比 VIP 会议(金色专属通道)和普通会议(蓝色共享通道),两条资源管道独立运行,互不干扰。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 1160 帧开始,持续 360 帧
  布局: 上方配置界面(30%) + 下方双通道演示(70%)
  2. 动画效果

    - 规则配置界面:
        - 从顶部滑入: translateY 从 -200 到 0
      - 使用 spring(),参数: damping: 100
      - 时间: 0-60 帧
    - 左侧 VIP 通道:
        - 会议室图标(金色 FaDoorOpen)
      - 箭头指向"专属站点"(金色标记)
      - 资源流动动画: 金色粒子沿路径移动
      - 粒子使用 interpolate() 控制位置
    - 右侧普通通道:
        - 会议室图标(蓝色 FaVideo)
      - 箭头指向"共享站点"(蓝色标记)
      - 蓝色粒子流动
    - "互不干扰"标识:
        - 中间分隔线,带 "✓ 互不干扰" 文字
      - 使用 spring() 实现弹出效果
  3. UI 元素与素材方案
    - 背景: 白色到浅灰色渐变
    - 标题: "VIP 会议专属资源,普通会议共享资源,再也不会相互影响"
        - 字体: Noto Sans SC, 32px
    - 视觉素材:
        - 方案 A (首选): Figma node-id=181-29001 规则配置页面
      - 方案 B (备选): 代码生成流程图 + React Icons
  4. 代码示例结构
  <Sequence from={1160} durationInFrames={360}>
    <AbsoluteFill style={{
      background: 'linear-gradient(to bottom, #fff 0%, #f5f5f5 100%)'
    }}>
      {/* 顶部配置界面 */}
      <div style={{
        height: '30%',
        transform: `translateY(${interpolate(frame, [0, 60], [-200, 0])}px)`
      }}>
        <RuleConfigUI />
      </div>

      {/* 双通道演示 */}
      <div style={{
        height: '70%',
        display: 'flex',
        gap: 100,
        padding: '0 100px'
      }}>
        {/* VIP 通道 */}
        <ChannelFlow
          type="VIP"
          color="#FFD700"
          icon={FaDoorOpen}
          frame={frame - 60}
        />

        {/* 分隔线 */}
        <Divider
          label="✓ 互不干扰"
          scale={spring({
            frame: frame - 120,
            fps,
            config: { damping: 80 }
          })}
        />

        {/* 普通通道 */}
        <ChannelFlow
          type="普通"
          color="#1E90FF"
          icon={FaVideo}
          frame={frame - 60}
        />
      </div>
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 规则配置截图: Figma node-id=181-29001
  - 备选方案: 代码生成表单 UI
  - 图标: React Icons (FaDoorOpen, FaVideo, FaCheckCircle)

  ---
  场景 6: 核心能力 3 - 本地录制管理

  时间范围: 第 1540 帧到第 1840 帧 (共 300 帧, 约 10 秒)

  视觉目标
  展示站点详情页的录制服务区域,动画演示广州会议录制文件自动存储到广州站点服务器,广州管理员轻松点击查看本地文件,表情满意
  。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 1540 帧开始,持续 300 帧
  布局: 上方站点详情界面 + 下方流程演示
  2. 动画效果

    - 站点详情界面:
        - 淡入: opacity 从 0 到 1,时间 0-30 帧
      - 录制服务卡片高亮: 绿色边框脉冲
    - 文件流转动画:
        - 会议图标 → 录制中图标(红点闪烁)
      - 文件图标沿曲线路径飞向服务器
      - 使用 interpolate() 控制路径位置
      - 到达后文件夹弹出打开
    - 管理员角色:
        - 人物头像 + FaUser 图标
      - 鼠标光标移动到文件夹
      - 点击动画: 光标缩小 + 文件夹打开
      - 满意表情: 绿色 "✓" + 笑脸
  3. UI 元素与素材方案
    - 背景: 白色
    - 标题: "录制文件存在本地站点,分支管理员自己就能找,不用再催总部"
        - 字体: Noto Sans SC, 32px
    - 视觉素材:
        - 方案 A (首选): Figma node-id=4-79116 或 21-24375 站点详情
      - 方案 B (备选): 代码生成服务卡片 + 流程图
  4. 代码示例结构
  <Sequence from={1540} durationInFrames={300}>
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* 站点详情界面 */}
      <div style={{
        padding: 40,
        opacity: interpolate(frame, [0, 30], [0, 1])
      }}>
        <SiteDetailPanel />
      </div>

      {/* 流程演示 */}
      <div style={{
        position: 'absolute',
        bottom: 200,
        width: '100%',
        padding: '0 100px'
      }}>
        {/* 文件流转路径 */}
        <FileFlowAnimation
          progress={interpolate(frame, [60, 180], [0, 1])}
          from={{ x: 200, y: 100 }}
          to={{ x: 1200, y: 100 }}
        />

        {/* 管理员操作 */}
        <AdminInteraction
          frame={frame - 180}
          position={{ x: 1200, y: 100 }}
        />
      </div>
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 站点详情截图: Figma node-id=4-79116 或 21-24375
  - 备选方案: 代码生成 UI
  - 图标: React Icons (FaVideo, FaFileAlt, FaFolderOpen, FaUser, FaSmile)

  ---
  场景 7: 核心能力 4 - 智能容灾

  时间范围: 第 1860 帧到第 2100 帧 (共 240 帧, 约 8 秒)

  视觉目标
  展示备份站点配置界面,动画演示成都站点服务器故障(红色 X),自动切换到重庆备份站点(绿色 ✓),会议无缝继续。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 1860 帧开始,持续 240 帧
  2. 动画效果

    - 备份配置界面:
        - 从左侧滑入: translateX 从 -400 到 0
      - 使用 spring(),时间 0-60 帧
    - 故障发生:
        - 成都站点服务器: 正常(绿色) → 红色闪烁 → 红色 "X"
      - 使用 interpolate() 控制颜色变化
      - 时间: 60-120 帧
    - 自动切换动画:
        - 箭头从成都指向重庆
      - 箭头使用 spring() 生长,参数: damping: 100
      - 重庆站点背景变为绿色,出现 "✓"
      - 时间: 120-180 帧
    - 会议状态:
        - 底部显示"会议进行中"状态条
      - 颜色始终为绿色,无中断
  3. UI 元素与素材方案
    - 背景: 深色 #1A1A1A
    - 标题: "本地资源故障?自动切换备份站点,会议不中断"
        - 字体: Noto Sans SC, 32px, 白色
    - 视觉素材:
        - 方案 A (首选): Figma node-id=33-35480 备份配置界面
      - 方案 B (备选): 代码生成故障切换流程图
  4. 代码示例结构
  <Sequence from={1860} durationInFrames={240}>
    <AbsoluteFill style={{ backgroundColor: '#1A1A1A' }}>
      {/* 备份配置界面 */}
      <div style={{
        transform: `translateX(${interpolate(frame, [0, 60], [-400, 0])}px)`
      }}>
        <BackupConfigPanel />
      </div>

      {/* 故障切换演示 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000
      }}>
        {/* 成都站点 */}
        <ServerNode
          city="成都"
          status={frame < 120 ? 'normal' : 'error'}
          x={200}
          y={0}
        />

        {/* 切换箭头 */}
        <Arrow
          from={{ x: 300, y: 0 }}
          to={{ x: 700, y: 0 }}
          progress={spring({
            frame: frame - 120,
            fps,
            config: { damping: 100 }
          })}
        />

        {/* 重庆备份站点 */}
        <ServerNode
          city="重庆"
          status={frame > 180 ? 'active' : 'standby'}
          x={800}
          y={0}
        />
      </div>

      {/* 会议状态条 */}
      <MeetingStatusBar status="running" />
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 备份配置截图: Figma node-id=33-35480
  - 备选方案: 代码生成流程图
  - 图标: React Icons (FaServer, FaExclamationTriangle, FaCheckCircle, FaExchangeAlt)

  ---
  场景 8: 效果对比总结

  时间范围: 第 2120 帧到第 2360 帧 (共 240 帧, 约 8 秒)

  视觉目标
  左右分屏对比使用前后效果,左侧显示问题场景(服务器冒烟、延迟高、员工焦虑),右侧显示使用后场景(服务器正常、延迟低、员工微
  笑),中间显示关键数据变化。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 2120 帧开始,持续 240 帧
  布局: 左右分屏(45% + 45%) + 中间数据(10%)
  2. 动画效果

    - 分屏入场:
        - 左侧从左滑入: translateX 从 -1000 到 0
      - 右侧从右滑入: translateX 从 1000 到 0
      - 使用 spring(),参数: damping: 80
      - 时间: 0-60 帧
    - 中间数据动画:
        - 三个数据指标依次出现
      - 每个指标: 数字滚动 + 箭头下降动画
      - "延迟 ↓ 95%": 红色 → 绿色渐变
      - "总部负载 ↓ 70%": 数字滚动计数器
      - "运维工单 ↓ 80%": 柱状图高度降低
  3. UI 元素与素材方案
    - 背景: 纯黑色 #000
    - 标题: "延迟降 95%,总部减负 70%,运维不再天天被催"
        - 字体: Noto Sans SC Bold, 40px, 白色
      - 位置: 底部居中
    - 视觉素材:
        - 方案 A (首选): 代码生成对比场景 + 数据可视化
      - 方案 B (备选): 插图(如果 Figma 有)
  4. 代码示例结构
  <Sequence from={2120} durationInFrames={240}>
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* 左侧 - 使用前 */}
        <div style={{
          flex: '0 0 45%',
          transform: `translateX(${interpolate(frame, [0, 60], [-1000, 0])}px)`,
          background: 'linear-gradient(to right, #4A1F1F 0%, transparent 100%)'
        }}>
          <BeforeScene />
        </div>

        {/* 中间 - 数据对比 */}
        <div style={{
          flex: '0 0 10%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 40
        }}>
          <DataMetric
            label="延迟"
            value={95}
            unit="%"
            icon="↓"
            frame={frame - 60}
            delay={0}
          />
          <DataMetric
            label="总部负载"
            value={70}
            unit="%"
            icon="↓"
            frame={frame - 60}
            delay={30}
          />
          <DataMetric
            label="运维工单"
            value={80}
            unit="%"
            icon="↓"
            frame={frame - 60}
            delay={60}
          />
        </div>

        {/* 右侧 - 使用后 */}
        <div style={{
          flex: '0 0 45%',
          transform: `translateX(${interpolate(frame, [0, 60], [1000, 0])}px)`,
          background: 'linear-gradient(to left, #1F4A1F 0%, transparent 100%)'
        }}>
          <AfterScene />
        </div>
      </div>

      {/* 底部标题 */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        width: '100%',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        opacity: interpolate(frame, [120, 150], [0, 1])
      }}>
        延迟降 95%,总部减负 70%,运维不再天天被催
      </div>
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 对比场景: 代码生成
  - 数据可视化: 滚动计数器 + 箭头动画
  - 图标: React Icons (FaServer, FaSmile, FaFrown, FaArrowDown)

  ---
  场景 9: 行动号召

  时间范围: 第 2380 帧到第 2520 帧 (共 140 帧, 约 4.7 秒)

  视觉目标
  回到站点管理主界面全景,界面缩小并居中显示,周围出现光效和粒子,底部显示 CTA 文字,整体营造科技感和专业感。

  Remotion 实现要点

  1. 组件结构
  使用 <Sequence> 组件,从第 2380 帧开始,持续 140 帧
  2. 动画效果

    - 界面缩放:
        - 从全屏缩小到 70% 大小
      - 使用 spring(),参数: damping: 100
      - 同时添加阴影: box-shadow 从无到大
      - 时间: 0-60 帧
    - 光效:
        - 周围出现多个光点,随机位置
      - 光点使用 spring() 实现弹出
      - 闪烁效果: opacity 在 0.5-1 之间波动
    - CTA 文字:
        - "站点管理,让多地部署不再是负担"
      - 淡入 + 向上滑动
      - 使用 interpolate(),时间 60-90 帧
  3. UI 元素与素材方案
    - 背景: 深蓝色到黑色渐变
    background: 'radial-gradient(circle at center, #1e3c72 0%, #000 100%)'
    - CTA 文字:
        - 字体: Noto Sans SC Bold, 48px, 白色
      - 位置: 底部居中,距底部 100px
    - 视觉素材:
        - 方案 A (首选): Figma node-id=1-10731 主界面截图
      - 方案 B (备选): 使用前面场景的界面元素
  4. 代码示例结构
  <Sequence from={2380} durationInFrames={140}>
    <AbsoluteFill style={{
      background: 'radial-gradient(circle at center, #1e3c72 0%, #000 100%)'
    }}>
      {/* 背景光点 */}
      {Array.from({ length: 20 }).map((_, i) => (
        <LightParticle
          key={i}
          x={Math.random() * 1920}
          y={Math.random() * 1080}
          scale={spring({
            frame: frame - (i * 3),
            fps,
            config: { damping: 80 }
          })}
        />
      ))}

      {/* 主界面 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, 60], [1, 0.7])})`,
        width: '80%',
        boxShadow: `0 20px 60px rgba(0,0,0,${interpolate(frame, [0, 60], [0, 0.5])})`
      }}>
        <MainInterfaceScreenshot />
      </div>

      {/* CTA 文字 */}
      <div style={{
        position: 'absolute',
        bottom: 100,
        width: '100%',
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        opacity: interpolate(frame, [60, 90], [0, 1]),
        transform: `translateY(${interpolate(frame, [60, 90], [30, 0])}px)`
      }}>
        站点管理,让多地部署不再是负担
      </div>
    </AbsoluteFill>
  </Sequence>

  素材需求与获取方案
  - 主界面截图: Figma node-id=1-10731
  - 备选方案: 使用前面场景的界面组合
  - 光效: 代码生成

  ---
  完整时间轴

  总体结构 (使用 TransitionSeries):

  ├─ Scene 1 (Frame 0-240): 痛点引入 - 总部资源崩溃
  │  └─ Transition (Frame 240-260): fade()
  ├─ Scene 2 (Frame 260-560): 痛点具象化 - 四大灾难
  │  └─ Transition (Frame 560-580): fade()
  ├─ Scene 3 (Frame 580-760): 解决方案登场
  │  └─ Transition (Frame 760-780): fade()
  ├─ Scene 4 (Frame 780-1140): 核心能力 1 - 就近接入
  │  └─ Transition (Frame 1140-1160): slide({ direction: 'from-right' })
  ├─ Scene 5 (Frame 1160-1520): 核心能力 2 - 会议隔离
  │  └─ Transition (Frame 1520-1540): slide({ direction: 'from-right' })
  ├─ Scene 6 (Frame 1540-1840): 核心能力 3 - 本地录制管理
  │  └─ Transition (Frame 1840-1860): slide({ direction: 'from-right' })
  ├─ Scene 7 (Frame 1860-2100): 核心能力 4 - 智能容灾
  │  └─ Transition (Frame 2100-2120): fade()
  ├─ Scene 8 (Frame 2120-2360): 效果对比总结
  │  └─ Transition (Frame 2360-2380): fade()
  └─ Scene 9 (Frame 2380-2520): 行动号召

  ---
  Root 组件配置提示

  // src/Root.tsx
  import { Composition } from 'remotion';
  import { ProductDemo } from './Composition';

  export const RemotionRoot: React.FC = () => {
    return (
      <Composition
        id="SiteManagementDemo"
        component={ProductDemo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={2520}
      />
    );
  };

  ---
  样式建议

  配色方案

  - 问题场景: #F7131C (红色), #FF6B35 (橙色), #4A1F1F (暗红背景)
  - 解决方案: #00C853 (绿色), #1E90FF (蓝色), #1e3c72 (深蓝背景)
  - 中性色: #333 (深灰文字), #F5F5F5 (浅灰背景), #A0A0A0 (次要文字)
  - 特殊: #FFD700 (金色 - VIP 标识)

  字体方案

  - 主标题: Noto Sans SC Bold, 48-96px
  - 副标题: Noto Sans SC SemiBold, 32-40px
  - 正文: Noto Sans SC Regular, 24-28px
  - 数据: Roboto Mono (等宽字体), 32-48px

  动画节奏

  - 快速动画 (10-20帧): 图标弹出、按钮点击
  - 标准动画 (30-60帧): 场景转场、元素移动
  - 慢速动画 (60-120帧): 数据变化、复杂路径

  Spring 参数指南

  - 弹性效果: damping: 50-80, stiffness: 150-200
  - 平滑效果: damping: 100-150, stiffness: 100-150
  - 快速响应: damping: 200, stiffness: 300

  ---
  注意事项

  1. 性能优化

  - 使用 <OffthreadVideo> 而非 <Video>
  - 图片提前优化到合适尺寸(建议不超过 1920x1080)
  - 避免同时运行超过 3 个复杂动画
  - 使用 willChange CSS 属性优化动画性能

  2. 响应式处理

  const { width, height } = useVideoConfig();
  const scale = width / 1920; // 基于 1920 宽度的缩放

  3. 素材准备

  - 所有图片放在 public/assets/images/ 目录
  - SVG 图标放在 public/assets/icons/ 目录
  - 使用 staticFile('assets/images/xxx.png') 引用
  - 字体使用 @remotion/google-fonts/NotoSansSC

  4. Figma 资源提取

  如果使用 Figma MCP 工具:
  - 提取 node-id=1-10731 (站点列表)
  - 提取 node-id=4-79116 (站点详情)
  - 提取 node-id=21-24375 (站点详情备选)
  - 提取 node-id=33-35480 (备份配置)
  - 提取 node-id=181-29001 (规则配置)

  导出设置:
  - 格式: PNG
  - 分辨率: 2x
  - 背景: 透明(如果需要)

  ---
  完成检查清单

  - 所有 9 个场景的 React 组件已创建
  - src/Root.tsx 配置正确
  - src/Composition.tsx 使用 TransitionSeries 组织场景
  - 所有素材已放入 public/ 目录
  - 字体已通过 @remotion/google-fonts 加载
  - 本地预览(npm run dev)正常运行
  - 所有动画时长加起来等于 2520 帧
  - 转场效果平滑,无突兀感

  ---