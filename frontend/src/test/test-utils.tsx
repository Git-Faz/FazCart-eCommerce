import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import authReducer from '@/features/auth/authSlice';
import type { AuthState } from '@/features/auth/authSlice';

export function createTestStore(preloadedState?: { auth: AuthState }) {
  return configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });
}

export function renderWithProviders(
  ui: ReactNode,
  {
    preloadedState,
    route = '/',
  }: {
    preloadedState?: { auth: AuthState };
    route?: string;
  } = {},
) {
  const store = createTestStore(preloadedState);
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return {
    store,
    queryClient,
    ...render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
        </QueryClientProvider>
      </Provider>,
    ),
  };
}
