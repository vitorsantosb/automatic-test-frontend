import { Card, Input, List, Button, Empty, Spin } from 'antd';
import { SearchOutlined, PlayCircleOutlined } from '@ant-design/icons';

export default function TestList({
  tests,
  searchText,
  onSearch,
  onRun,
  loading,
  selectedTest,
}) {
  return (
    <Card
      title="Lista de Testes"
      style={{ flex: 1, minWidth: 300 }}
      extra={
        <Input
          placeholder="Buscar testes..."
          value={searchText}
          onChange={(e) => onSearch(e.target.value)}
          prefix={<SearchOutlined />}
          style={{ width: 200 }}
        />
      }
    >
      <Spin spinning={loading}>
        {tests.length === 0 ? (
          <Empty
            description="Nenhum teste encontrado"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <List
            dataSource={tests}
            renderItem={(test) => (
              <List.Item
                actions={[
                  <Button
                    key="run"
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={() => onRun(test)}
                    loading={loading && selectedTest?.path === test.path}
                  >
                    Executar
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={test.name}
                  description={test.path}
                />
              </List.Item>
            )}
          />
        )}
      </Spin>
    </Card>
  );
} 