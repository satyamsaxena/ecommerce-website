import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { supabase } from './lib/supabase';
import { Header } from './components/layout/Header';
import { AuthForm } from './components/auth/AuthForm';
import { ProductList } from './components/products/ProductList';
import { AddProductForm } from './components/products/AddProductForm';
import { Banner } from './components/home/Banner';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <ProductList />
              </>
            }
          />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/add-product"
            element={
              <PrivateRoute>
                <AddProductForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;