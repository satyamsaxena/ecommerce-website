import React from 'react';
import { Product } from '../../types';
import { Trash2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useProductStore } from '../../stores/productStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const user = useAuthStore((state) => state.user);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const isOwner = user?.id === product.user_id;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          {isOwner && (
            <button
              onClick={() => deleteProduct(product.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
      </div>
    </div>
  );
}