import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DefaultToast } from './components/default-toast';
import Routes from './routes';

export const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DefaultToast />
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
