import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  category: string | null;
  fetchProducts: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setCategory: (category: string | null) => void;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  searchTerm: '',
  category: null,

  fetchProducts: async () => {
    set({ loading: true });
    let query = supabase.from('products').select('*');

    const { searchTerm, category } = get();
    
    if (searchTerm) {
      query = query.ilike('name', `%${searchTerm}%`);
    }
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    set({ products: data, loading: false });
  },

  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setCategory: (category) => set({ category }),

  addProduct: async (product) => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('Not authenticated');

    const { error } = await supabase.from('products').insert({
      ...product,
      user_id: userData.user.id,
    });

    if (error) throw error;
    get().fetchProducts();
  },

  deleteProduct: async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
    get().fetchProducts();
  },
}));