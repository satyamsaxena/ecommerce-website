import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LogOut, ShoppingBag, Plus } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-blue-600"
            >
              <ShoppingBag className="h-6 w-6 mr-2" />
              ShopStyle
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <>
                <Link
                  to="/add-product"
                  className="mr-4 flex items-center text-gray-600 hover:text-gray-900"
                >
                  <Plus className="h-5 w-5 mr-1" />
                  Add Product
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}