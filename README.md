# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Cypress Test Runner Frontend

Frontend para execução de testes Cypress com visualização em tempo real via noVNC.

## Funcionalidades

- 🧪 Lista e execução de testes Cypress
- 📊 Visualização de resultados em tempo real
- 🖥️ Visualização da tela do container via noVNC
- 🔄 Atualização automática de logs
- 🔍 Busca de testes
- 📡 Conexão WebSocket para comunicação em tempo real

## Componentes VNC

### VncPanel
Painel que exibe a tela do container Docker via noVNC quando um teste está sendo executado.

**Características:**
- Aparece automaticamente quando um teste é iniciado
- Posicionado acima do painel de resultados
- Permanece visível permanentemente após ser aberto
- Botão para fechar manualmente
- Exibe loading enquanto conecta ao noVNC
- Tratamento de erros de conexão
- Altura fixa de 400px

**Uso:**
```jsx
<VncPanel
  visible={vncModalVisible}
  testName={selectedTest?.name || 'Teste'}
  loading={loading}
  onClose={() => setVncModalVisible(false)}
/>
```

### VncStatus
Componente que mostra o status da conexão VNC no header da aplicação.

**Características:**
- Verifica automaticamente a disponibilidade do noVNC
- Atualiza o status a cada 30 segundos
- Indicadores visuais (verde = conectado, vermelho = desconectado)
- Tooltip com informações detalhadas

## Configuração do Backend

Para que o VNC funcione corretamente, o backend deve estar configurado com:

1. **Container Docker com noVNC** rodando na porta 6080
2. **WebSocket** configurado para comunicação em tempo real
3. **CORS** configurado para permitir conexões do frontend

### Exemplo de configuração Docker:
```dockerfile
# Instalar noVNC no container
RUN apt-get update && apt-get install -y \
    xvfb \
    x11vnc \
    novnc \
    && rm -rf /var/lib/apt/lists/*

# Expor portas VNC
EXPOSE 5900 6080

# Iniciar VNC server e noVNC
CMD ["sh", "-c", "x11vnc -display :99 -forever -nopw -listen localhost -xkb & /usr/share/novnc/utils/launch.sh --vnc localhost:5900 --listen 6080"]
```

## Desenvolvimento

### Instalação
```bash
npm install
```

### Execução
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── HeaderBar.jsx      # Header com status VNC
│   ├── TestList.jsx       # Lista de testes
│   ├── TestResultPanel.jsx # Painel de resultados
│   ├── VncPanel.jsx       # Painel VNC
│   └── VncStatus.jsx      # Status da conexão VNC
├── contexts/
│   └── SocketContext.jsx  # Contexto WebSocket
├── hooks/
│   ├── useTestRunner.js   # Hook para execução de testes
│   └── useWebSocket.js    # Hook para WebSocket
└── services/
    └── routes/
        └── tests/
            └── tests.service.js # Serviços de API
```

## Tecnologias Utilizadas

- **React** - Framework frontend
- **Vite** - Build tool
- **Ant Design** - UI Components
- **WebSocket** - Comunicação em tempo real
- **noVNC** - Visualização remota VNC
