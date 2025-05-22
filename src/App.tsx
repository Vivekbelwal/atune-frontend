import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { store } from './store';
import AppRouter from './routes';
import './index.css';

/**
 * Main application component
 * Sets up Redux provider and Ant Design theme
 */
function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 6,
          },
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
