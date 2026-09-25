import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './queries';
import * as productApi from './api';

vi.mock('./api');

describe('useProducts', () => {
  it('uses the search endpoint when a query is present', async () => {
    vi.mocked(productApi.getProductByName).mockResolvedValue({
      data: { content: [], totalPages: 1, totalElements: 0, number: 0, size: 15 },
    } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

    const { result } = renderHook(() => useProducts({ query: 'coffee', page: 0 }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(productApi.getProductByName).toHaveBeenCalledWith('coffee', 0, 15);
    expect(productApi.getProducts).not.toHaveBeenCalled();
  });
});
