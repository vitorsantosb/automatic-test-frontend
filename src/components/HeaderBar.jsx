import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

export default function HeaderBar() {
  return (
    <Header style={{ background: '#1890ff', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: 70, boxShadow: '0 2px 8px rgba(24,144,255,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg" alt="Cypress Logo" style={{ height: 36, background: '#fff', borderRadius: '50%', padding: 4 }} />
        <Title level={3} style={{ color: 'white', margin: 0, letterSpacing: 1 }}>Cypress Test Runner</Title>
      </div>
    </Header>
  );
} 