import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Root } from './pages';
import { store } from './store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="w-screen h-screen flex flex-col">
          <Root />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
