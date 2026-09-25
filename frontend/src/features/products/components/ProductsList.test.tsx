import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import ProductsList from './ProductsList';
import { renderWithProviders } from '@/test/test-utils';
import * as productQueries from '@/features/products/queries';
import * as cartMutation from '@/features/cart/mutation';

vi.mock('@/features/products/queries');
vi.mock('@/features/cart/mutation');
vi.mock('sonner', () => ({ toast: { error: vi.fn(), success: vi.fn(), info: vi.fn() } }));

const product = {
  id: 3,
  name: 'Coffee',
  description: 'Fresh coffee',
  categories: ['food'],
  price: 250,
  stock: 5,
  imageUrl: '/coffee.jpg',
};

describe('ProductsList', () => {
  it('prevents unauthenticated cart additions and still renders products', () => {
    vi.mocked(productQueries.useProducts).mockReturnValue({
      data: { content: [product], totalPages: 1, totalElements: 1, number: 0, size: 15 },
      isLoading: false,
      isFetching: false,
      isError: false,
    } as never);
    const mutate = vi.fn();
    vi.mocked(cartMutation.useAddToCart).mockReturnValue({ mutate, isPending: false } as never);
    renderWithProviders(<ProductsList hidePagination />, {
      preloadedState: { auth: { user: null, token: null, status: 'idle', error: null } },
    });

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(mutate).not.toHaveBeenCalled();
  });

  it('adds a product to the cart for an authenticated user', () => {
    vi.mocked(productQueries.useProducts).mockReturnValue({
      data: { content: [product], totalPages: 1, totalElements: 1, number: 0, size: 15 },
      isLoading: false,
      isFetching: false,
      isError: false,
    } as never);
    const mutate = vi.fn();
    vi.mocked(cartMutation.useAddToCart).mockReturnValue({ mutate, isPending: false } as never);
    renderWithProviders(<ProductsList hidePagination />, {
      preloadedState: {
        auth: {
          user: { id: 1, email: 'faz@example.com', username: 'faz', role: ['USER'] },
          token: 'token',
          status: 'idle',
          error: null,
        },
      },
    });

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(mutate).toHaveBeenCalledWith(
      { productId: 3, quantity: 1 },
      expect.objectContaining({ onSuccess: expect.any(Function), onError: expect.any(Function) }),
    );
  });
});
