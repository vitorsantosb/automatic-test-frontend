import { Card, Spin, Button, List, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function TestResultPanel({ loading, logs, onRefresh }) {
  return (
    <Card
      title="Resultado do Teste"
      style={{ flex: 1, minWidth: 300 }}
      extra={
        <Button
          icon={<ReloadOutlined />}
          onClick={onRefresh}
          disabled={loading}
        >
          Atualizar
        </Button>
      }
    >
      <Spin spinning={loading}>
        {logs.length === 0 ? (
          <Text type="secondary">Nenhum resultado disponível</Text>
        ) : (
          <List
            dataSource={logs}
            renderItem={(log) => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <Title level={5}>{log.title}</Title>
                  <Text type={log.state === 'passed' ? 'success' : 'danger'}>
                    Estado: {log.state}
                  </Text>
                  {log.duration && (
                    <Text style={{ display: 'block' }}>
                      Duração: {log.duration}ms
                    </Text>
                  )}
                </div>
              </List.Item>
            )}
          />
        )}
      </Spin>
    </Card>
  );
} 