import { Card, Spin, Typography, Alert, Button } from 'antd';
import { useState, useEffect } from 'react';
import { DesktopOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

export function VncPanel({ visible, testName, loading, onClose }) {
  const [iframeLoading, setIframeLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    if (visible) {
      setIframeLoading(true);
      setConnectionError(false);
    }
  }, [visible]);

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  const handleIframeError = () => {
    setIframeLoading(false);
    setConnectionError(true);
  };

  if (!visible) {
    return null;
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <DesktopOutlined />
            <span>Visualização da Tela - {testName}</span>
          </div>
          {onClose && (
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={onClose}
              size="small"
              style={{ color: '#666' }}
            />
          )}
        </div>
      }
      style={{ 
        marginBottom: 16,
        border: '1px solid #d9d9d9',
        borderRadius: 8
      }}
      bodyStyle={{ 
        padding: 0,
        position: 'relative',
        height: '400px'
      }}
    >
      {iframeLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          zIndex: 1,
          borderRadius: '0 0 8px 8px'
        }}>
          <Spin size="large" tip="Conectando ao noVNC..." />
        </div>
      )}
      
      {connectionError && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          zIndex: 1,
          borderRadius: '0 0 8px 8px'
        }}>
          <Alert
            message="Erro ao conectar com o noVNC"
            description="Verifique se o container está rodando na porta 5900"
            type="error"
            showIcon
            style={{ maxWidth: 400 }}
          />
        </div>
      )}

      <iframe
        src="http://localhost:6080/vnc.html"
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          borderRadius: '0 0 8px 8px',
          display: iframeLoading || connectionError ? 'none' : 'block'
        }}
        title="VNC Viewer"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </Card>
  );
} 