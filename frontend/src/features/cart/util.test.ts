import { describe, expect, it } from 'vitest';
import { consumeCartIntent, saveCartIntent } from './util';

describe('cart intent storage', () => {
  it('saves and consumes an intent once', () => {
    saveCartIntent(12, 3);

    expect(consumeCartIntent()).toEqual({ productId: 12, quantity: 3 });
    expect(consumeCartIntent()).toBeNull();
  });

  it('uses quantity one by default', () => {
    saveCartIntent(8);

    expect(JSON.parse(localStorage.getItem('pendingCartItem') ?? '')).toEqual({
      productId: 8,
      quantity: 1,
    });
  });
});
