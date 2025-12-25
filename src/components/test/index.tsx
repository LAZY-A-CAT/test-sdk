import React, { useState, useRef, useEffect } from 'react';
import './index.scss';

// 定义模块类型
interface ModuleData {
  id: string;
  icon: string;
  title: string;
  color: string;
  content: React.ReactNode;
}

const AccessibilityPage: React.FC = () => {
  // 创建refs用于各个模块
  const userInfoRef = useRef<HTMLDivElement>(null);
  const ticketInfoRef = useRef<HTMLDivElement>(null);
  const userJourneyRef = useRef<HTMLDivElement>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [fixedTitle, setFixedTitle] = useState('');
  const [currentModule, setCurrentModule] = useState('user-info');
  const [isScrolling, setIsScrolling] = useState(false);

  // 模块数据
  const modules: ModuleData[] = [
    {
      id: 'user-info',
      icon: '👤',
      title: 'User Info',
      color: '#4CAF50',
      content: (
        <div className="user-info-content">
          <div className="info-row">
            <span className="label">Username:</span>
            <span className="value">Erin</span>
          </div>
          <div className="info-row">
            <span className="label">User Source:</span>
            <span className="value">💺</span>
          </div>
          <div className="info-row">
            <span className="label">Phone:</span>
            <span className="value">6281519140316</span>
          </div>
          <div className="info-row">
            <span className="label">User Tags:</span>
            <span className="value">💻</span>
          </div>
          <div className="info-row">
            <span className="label">User Group:</span>
            <span className="value">💻</span>
          </div>
          <div className="info-row">
            <span className="label">Customer language:</span>
            <span className="value">English 💻</span>
          </div>
        </div>
      ),
    },
    {
      id: 'ticket-info',
      icon: '🎫',
      title: 'Ticket Information',
      color: '#2196F3',
      content: (
        <div className="ticket-info-content">
          <div className="checkbox-row">
            <span className="checkbox-label">🔍 🔍</span>
            <span className="checkbox-text">请填写</span>
          </div>
          <div className="info-row">
            <span className="label">Ticket Number:</span>
            <span className="value">2025120415805524</span>
          </div>
          <div className="info-row">
            <span className="label">Ticket Type:</span>
            <span className="value">售前咨询</span>
          </div>
          <div className="info-row">
            <span className="label">Sub-type:</span>
            <span className="value">💻</span>
          </div>
          <div className="info-row">
            <span className="label">Ticket Status:</span>
            <span className="value status-close">CLOSE</span>
          </div>
          <div className="info-row">
            <span className="label">SLA:</span>
            <span className="value">-</span>
          </div>
          <div className="info-row">
            <span className="label">Details:</span>
            <span className="value">💻</span>
          </div>
        </div>
      ),
    },
    {
      id: 'user-journey',
      icon: '📊',
      title: 'User journey',
      color: '#9C27B0',
      content: (
        <div className="user-journey-content">
          <div className="journey-header">
            <div className="journey-note">Please fill in the log</div>
            <div className="journey-table">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '60%' }}></th>
                    <th style={{ width: '40%' }}>Submit</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2025-10-16 19:21:12', submit: 'incs_3' },
                    { date: 'Voice chat with customer00:12 ~', submit: 'incs_3' },
                    { date: '2025-10-16 18:52:58', submit: 'incs_3' },
                    { date: 'Voice chat with customer00:16 ~', submit: 'incs_3' },
                    { date: '2025-10-16 18:52:55', submit: 'incs_3' },
                    { date: 'Voice chat with customer00:16 ~', submit: 'incs_3' },
                    { date: '2025-10-16 18:48:33', submit: 'incs_3' },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.submit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // 点击导航图标滚动到对应模块
  const handleNavClick = (moduleId: string) => {
    const moduleRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      'user-info': userInfoRef,
      'ticket-info': ticketInfoRef,
      'user-journey': userJourneyRef,
    };

    const ref = moduleRefs[moduleId];
    if (ref?.current && containerRef.current) {
      setIsScrolling(true);
      setCurrentModule(moduleId);
      setFixedTitle(modules.find(m => m.id === moduleId)?.title || '');
      
      // 计算滚动位置（模块顶部对齐容器顶部）
      const container = containerRef.current;
      const moduleTop = ref.current.offsetTop;
      
      container.scrollTo({
        top: moduleTop,
        behavior: 'smooth',
      });

      // 滚动完成后重置状态
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  // 监听滚动事件
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling) return; // 如果正在通过点击导航滚动，不触发自动检测

      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // 获取所有模块的位置
      const modulePositions = [
        { id: 'user-info', top: userInfoRef.current?.offsetTop || 0 },
        { id: 'ticket-info', top: ticketInfoRef.current?.offsetTop || 0 },
        { id: 'user-journey', top: userJourneyRef.current?.offsetTop || 0 },
      ];

      // 找到当前可见的模块
      let currentVisibleModule = modulePositions[0].id;
      
      for (let i = modulePositions.length - 1; i >= 0; i--) {
        if (scrollTop + 100 >= modulePositions[i].top) {
          currentVisibleModule = modulePositions[i].id;
          break;
        }
      }

      // 更新当前模块
      if (currentVisibleModule !== currentModule) {
        setCurrentModule(currentVisibleModule);
      }

      // 检查是否需要显示固定标题
      const currentModuleData = modules.find(m => m.id === currentVisibleModule);
      if (currentModuleData) {
        const currentModuleTop = modulePositions.find(m => m.id === currentVisibleModule)?.top || 0;
        
        if (scrollTop > currentModuleTop + 20) {
          setFixedTitle(currentModuleData.title);
        } else {
          setFixedTitle('');
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentModule, isScrolling, modules]);

  return (
    <div className="accessibility-page">
      {/* 左侧导航栏 */}
      <div className="nav-sidebar">
        <div className="nav-header">
          <h2>Accessibility</h2>
        </div>
        <div className="nav-icons">
          {modules.map((module) => (
            <button
              key={module.id}
              className={`nav-icon ${currentModule === module.id ? 'active' : ''}`}
              onClick={() => handleNavClick(module.id)}
              style={{ borderColor: module.color }}
              title={module.title}
            >
              <span className="icon">{module.icon}</span>
              <span className="icon-title">{module.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="main-content">
        {/* 固定标题栏 */}
        <div className={`fixed-title-bar ${fixedTitle ? 'visible' : ''}`}>
          <div className="fixed-title-content">
            <span className="fixed-icon">
              {modules.find(m => m.id === currentModule)?.icon}
            </span>
            <span className="fixed-text">{fixedTitle}</span>
          </div>
        </div>

        {/* 滚动容器 */}
        <div className="content-container" ref={containerRef}>
          {/* 用户信息模块 */}
          <div 
            className="module-section" 
            ref={userInfoRef}
            data-module="user-info"
          >
            {fixedTitle !== 'User Info' && (
              <div className="module-header">
                <h2>User Info</h2>
              </div>
            )}
            <div className="module-content">
              {modules[0].content}
            </div>
          </div>

          {/* 分隔线 */}
          <div className="section-divider"></div>

          {/* 工单信息模块 */}
          <div 
            className="module-section" 
            ref={ticketInfoRef}
            data-module="ticket-info"
          >
            {fixedTitle !== 'Ticket Information' && (
              <div className="module-header">
                <h2>Ticket Information</h2>
              </div>
            )}
            <div className="module-content">
              {modules[1].content}
            </div>
          </div>

          {/* 分隔线 */}
          <div className="section-divider"></div>

          {/* 用户旅程模块 */}
          <div 
            className="module-section" 
            ref={userJourneyRef}
            data-module="user-journey"
          >
            {fixedTitle !== 'User journey' && (
              <div className="module-header">
                <h2>User journey</h2>
              </div>
            )}
            <div className="module-content">
              {modules[2].content}
            </div>
          </div>

          <div className="content-spacer"></div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPage;