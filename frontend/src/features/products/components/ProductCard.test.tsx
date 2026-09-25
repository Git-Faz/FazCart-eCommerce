import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { renderWithProviders } from '@/test/test-utils';

describe('ProductCard', () => {
  it('renders product details and emits card and cart actions', () => {
    const onClick = vi.fn();
    const onBtnClick = vi.fn();
    renderWithProviders(
      <ProductCard
        img={{ link: '/coffee.jpg', alt: 'coffee' }}
        name="Coffee"
        price={250}
        onClick={onClick}
        onBtnClick={onBtnClick}
      />,
    );

    expect(screen.getByRole('img', { name: 'coffee' })).toHaveAttribute('src', '/coffee.jpg');
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('₹250')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Coffee'));
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(onBtnClick).toHaveBeenCalledOnce();
  });
});
