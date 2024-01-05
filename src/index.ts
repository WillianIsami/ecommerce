import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

export const calculateTotalPrice = (cart: Product[]): number => {
  if (!cart || cart.length === 0) {
    return 0;
  }
  const totalPrice: number = cart.reduce((total, product) => {
    if (product && typeof product.price === 'number' && typeof product.quantity === 'number') {
        return total + product.price * product.quantity;
    } else {
      throw new Error('Invalid product structure in the shopping cart.');
    }
  }, 0);
  const roundTwoDecimal = Math.round(totalPrice * 100) / 100;
  return roundTwoDecimal;
};
