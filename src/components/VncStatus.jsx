import { Badge, Tooltip } from 'antd';
import { DesktopOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

export function VncStatus() {
  const [vncStatus, setVncStatus] = useState('checking');

  useEffect(() => {
    const checkVncStatus = async () => {
      try {
        await fetch('http://localhost:6080/vnc.html', {
          method: 'HEAD',
          mode: 'no-cors', // Para evitar problemas de CORS
        });
        setVncStatus('connected');
      } catch {
        setVncStatus('disconnected');
      }
    };

    checkVncStatus();
    
    // Verificar a cada 30 segundos
    const interval = setInterval(checkVncStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (vncStatus) {
      case 'connected':
        return 'success';
      case 'disconnected':
        return 'error';
      case 'checking':
        return 'processing';
      default:
        return 'default';
    }
  };

  const getStatusText = () => {
    switch (vncStatus) {
      case 'connected':
        return 'VNC Conectado';
      case 'disconnected':
        return 'VNC Desconectado';
      case 'checking':
        return 'Verificando VNC...';
      default:
        return 'Status VNC';
    }
  };

  return (
    <Tooltip title={getStatusText()}>
      <Badge status={getStatusColor()} text="VNC">
        <DesktopOutlined style={{ fontSize: '16px', color: 'white' }} />
      </Badge>
    </Tooltip>
  );
} 