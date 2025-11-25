import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SystemProvider } from '../components/providers/SystemProvider';
import { ThemeProviderContainer } from '../components/providers/ThemeProviderContainer';
import { useEffect } from 'react';
import { router } from './router';
import { disconnect } from '@/library/powersync/ConnectionManager';

const root = createRoot(document.getElementById('app')!);
root.render(<App />);

export function App() {
  const handleUnload = () => {
    disconnect();
  }

  useEffect(() => {
    window.addEventListener('beforeUnload', handleUnload);

    return () => {
      window.removeEventListener('beforeUnload', handleUnload);
    }
  }, [])

  return (
    <ThemeProviderContainer>
      <SystemProvider>
        <RouterProvider router={router} />
      </SystemProvider>
    </ThemeProviderContainer>
  );
}
