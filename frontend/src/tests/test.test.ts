import { calculateTotalPrice } from './test';

describe('calculateTotalPrice function', () => {
  test('calculates the total price correctly for a valid shopping cart', () => {
    const shoppingCart = [
      { name: 'Product A', price: 19.99, quantity: 2 },
      { name: 'Product B', price: 29.19, quantity: 1 },
      { name: 'Product C', price: 9.99, quantity: 3 },
    ];

    const total = calculateTotalPrice(shoppingCart);

    // The expected total is calculated as (19.99 * 2) + 29.99 + (9.99 * 3) = 99.94
    expect(total).toBe(99.14);
  });

  test('returns 0 for an empty shopping cart', () => {
    const shoppingCart: any[] = [];

    const total = calculateTotalPrice(shoppingCart);

    expect(total).toBe(0);
  });
});
