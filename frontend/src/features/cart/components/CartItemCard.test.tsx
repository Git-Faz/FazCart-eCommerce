import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import CartItemCard from './CartItemCard';
import { renderWithProviders } from '@/test/test-utils';

describe('CartItemCard', () => {
  it('renders item totals and supports navigation and deletion actions', () => {
    const onClick = vi.fn();
    const onDelete = vi.fn();
    renderWithProviders(
      <CartItemCard
        serialNo={1}
        name="Coffee"
        price={250}
        quantity={2}
        total={500}
        imageUrl="/coffee.jpg"
        onClick={onClick}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Total: ₹500')).toBeInTheDocument();
    fireEvent.click(screen.getByAltText('product image'));
    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
    expect(onDelete).toHaveBeenCalledOnce();
  });
});
