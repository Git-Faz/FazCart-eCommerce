import { describe, expect, it, vi } from 'vitest';
import api from '@/app/axios';
import { getProductById, getProductByName, getProducts } from './api';

vi.mock('@/app/axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('product API functions', () => {
  it('requests filtered product pages with the expected parameters', async () => {
    const response = { data: { content: [], totalPages: 0 } };
    vi.mocked(api.get).mockResolvedValue(response as never);

    await getProducts({ category: 'food', page: 1, size: 10, minPrice: 5 });

    expect(api.get).toHaveBeenCalledWith('/products', {
      params: { category: 'food', page: 1, size: 10, minPrice: 5 },
    });
  });

  it('requests search results and a product detail', async () => {
    vi.mocked(api.get).mockResolvedValue({ data: {} } as never);

    await getProductByName('coffee', 0, 15);
    await getProductById(9);

    expect(api.get).toHaveBeenNthCalledWith(1, '/products/search', {
      params: { name: 'coffee', page: 0, size: 15 },
    });
    expect(api.get).toHaveBeenNthCalledWith(2, '/products/9');
  });
});
