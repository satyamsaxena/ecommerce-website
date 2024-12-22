import React from 'react';
import { CartItem } from '../types';
import { X, ShoppingCart } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function Cart({ items, onRemoveFromCart, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <ShoppingCart size={24} />
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 pb-4 border-b">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                className="rounded border p-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">
          Total: ${total.toFixed(2)}
        </p>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Checkout
        </button>
      </div>
    </div>
  );
}