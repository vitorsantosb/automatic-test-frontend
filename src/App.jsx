import { Layout } from 'antd';
import { useEffect } from 'react';
import { SocketProvider } from './contexts/SocketContext.jsx';
import HeaderBar from './components/HeaderBar.jsx';
import TestList from './components/TestList.jsx';
import TestResultPanel from './components/TestResultPanel.jsx';
import { useTestRunner } from './hooks/useTestRunner.js';

const { Content } = Layout;

function AppContent() {
  const {
    tests,
    filteredTests,
    searchText,
    selectedTest,
    loading,
    testLogs,
    fetchTests,
    handleSearch,
    executeTest,
    setLoading,
    setSelectedTest,
    setFilteredTests,
  } = useTestRunner();

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#eaf1fb' }}>
      <HeaderBar />
      <Content style={{ padding: 0, minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column' }}>
        <div className="main-content-flex" style={{ flex: 1, display: 'flex', gap: 32, padding: 32, height: '100%' }}>
          <TestList
            tests={filteredTests}
            searchText={searchText}
            onSearch={handleSearch}
            onRun={executeTest}
            loading={loading}
            selectedTest={selectedTest}
          />
          <TestResultPanel
            loading={loading}
            logs={testLogs}
            onRefresh={fetchTests}
          />
        </div>
      </Content>
    </Layout>
  );
}

function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}

export default App;
