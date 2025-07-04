import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import { getTests } from "../services/routes/tests/tests.service.js";
import { useSocket } from '../contexts/SocketContext.jsx';

export function useTestRunner() {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testLogs, setTestLogs] = useState([]);
  const [vncModalVisible, setVncModalVisible] = useState(false);
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleTestStart = (data) => {
      console.log('📝 Teste iniciado:', data);
      message.info(`Iniciando teste: ${data.test}`);
    };

    const handleTestLog = (data) => {
      console.log('📝 Log do teste:', data);
      setTestLogs(prev => [...prev, data]);
    };

    const handleTestDone = (data) => {
      console.log('✅ Teste finalizado:', data);
      setLoading(false);
      // Mantém o VNC visível permanentemente
      if (data.success) {
        message.success('Teste concluído com sucesso!');
      }
    };

    const handleTestError = (data) => {
      console.error('❌ Erro no teste:', data);
      setLoading(false);
      // Mantém o VNC visível permanentemente mesmo em caso de erro
      message.error(`Erro no teste: ${data.message}`);
    };

    socket.on('test:start', handleTestStart);
    socket.on('test:log', handleTestLog);
    socket.on('test:done', handleTestDone);
    socket.on('test:error', handleTestError);

    return () => {
      socket.off('test:start', handleTestStart);
      socket.off('test:log', handleTestLog);
      socket.off('test:done', handleTestDone);
      socket.off('test:error', handleTestError);
    };
  }, [socket]);

  const fetchTests = useCallback(async () => {
    try {
      const response = await getTests();
      setTests(response.data);
      setFilteredTests(response.data);
    } catch {
      message.error('Falha ao buscar testes');
    }
  }, []);

  const handleSearch = useCallback((value) => {
    setSearchText(value);
    setFilteredTests(
      tests.filter((test) =>
        test.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, [tests]);

  const executeTest = useCallback(async (test) => {
    if (!socket || !isConnected) {
      message.error('Não conectado ao servidor');
      return;
    }

    setSelectedTest(test);
    setLoading(true);
    setTestLogs([]);
    setVncModalVisible(true);
    
    try {
      console.log('🚀 Enviando comando para executar teste:', test.path);
      socket.emit('run-test', test.path);
    } catch (error) {
      console.error('❌ Erro ao executar teste:', error);
      message.error('Falha ao iniciar o teste');
      setLoading(false);
      setVncModalVisible(false);
    }
  }, [socket, isConnected]);

  return {
    tests,
    filteredTests,
    searchText,
    selectedTest,
    loading,
    testLogs,
    vncModalVisible,
    isConnected,
    fetchTests,
    handleSearch,
    executeTest,
    setLoading,
    setSelectedTest,
    setFilteredTests,
    setVncModalVisible,
  };
} 